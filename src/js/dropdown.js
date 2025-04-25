$(document).ready(function () {
  const maxVisible = 5;

  $('.custom-select').each(function () {
    const $select = $(this);
    const isMultiple = $select.attr('multiple') !== undefined;
    $select.hide();

    const options = $select.find('option').map(function () {
      return { value: $(this).val(), text: $(this).text(), selected: $(this).is(':selected') };
    }).get();

    const $dropdown = $('<div class="dropdown-wrapper"></div>');
    const $trigger = $(`<div class="dropdown-trigger">
      ${$select.data('placeholder') ?? 'Choose options'}
      <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>
      </div>`);
    const $panel = $(`
      <div class="dropdown-panel" style="display: none;">
        <div class="dropdown-search" style="display: ${options.length > 5 ? 'block' : 'none'};">
          <input type="text" placeholder='${$select.data('placeholder-search') ?? "Search"}'>
        </div>
        <div class="dropdown-options"></div>
      </div>
    `);

    const $optionsContainer = $panel.find('.dropdown-options');

    options.forEach((opt, index) => {
      const inputType = isMultiple ? 'checkbox' : 'radio';
      const isChecked = opt.selected ? 'checked' : '';
      const $opt = $(`
        <label class="dropdown-option" style="${index >= maxVisible ? 'display: none;' : ''}">
          <input type="${inputType}" name="${isMultiple ? '' : $select.attr('name')}" value="${opt.value}" ${isChecked}> 
          <span>${opt.text}</span>
        </label>
      `);
      $optionsContainer.append($opt);
    });

    const hiddenCount = options.length - maxVisible;
    let $more = null;

    if (hiddenCount > 0) {
      $more = $(`<div class="dropdown-more">+${hiddenCount} more</div>`);
      $optionsContainer.append($more);

      $more.on('click', function () {
        $optionsContainer.find('.dropdown-option').show();
        $more.remove();
      });
    }

    $dropdown.append($trigger).append($panel);
    $select.after($dropdown);

    // Встановлюємо початковий текст тригера
    const updateTriggerText = () => {
      const selected = $optionsContainer.find('input:checked').map(function () {
        return $(this).siblings('span').text();
      }).get();

      if (isMultiple) {
        if (selected.length === 0) {
          $trigger.html(`${$select.data('placeholder') ?? 'Choose options'} <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`);
          $trigger.removeClass('is-selected');
        } else {
          $trigger.html(`<span>${$select.data('placeholder')} <sup>${selected.length}</sup></span> <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`);
          $trigger.addClass('is-selected');
        }
      } else {
        if (selected.length === 0) {
          $trigger.html(`${$select.data('placeholder') ?? 'Choose option'} <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`);
        } else {
          $trigger.html(`<span>${$select.data('placeholder') ?? ''} <b>${selected[0]} </b></span> <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`);
        }
      }
    };

    updateTriggerText();

    $trigger.on('click', function (e) {
      e.stopPropagation();
      if ($panel.is(':visible')) {
        $panel.hide();
        $trigger.removeClass('is-open');
      } else {
        $('.dropdown-panel').hide();
        $('.dropdown-trigger').removeClass('is-open');
        $panel.show();
        $trigger.addClass('is-open');
      }
    });

    $panel.find('input[type="text"]').on('keyup', function () {
      const search = $(this).val().toLowerCase();
      $optionsContainer.find('.dropdown-option').each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(search));
      });

      // Ховаємо "+N more" при пошуку
      if ($more) {
        if (search.length > 0) {
          $more.hide();
        } else {
          $more.show();
        }
      }
    });

    $optionsContainer.on('change', 'input', function () {
      const selected = $optionsContainer.find('input:checked').map(function () {
        return $(this).val();
      }).get();

      if (isMultiple) {
        $select.val(selected).trigger('change');
      } else {
        $select.val(selected[0]).trigger('change');
        $panel.hide();
        $trigger.removeClass('is-open');
      }

      updateTriggerText();
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.dropdown-wrapper').length) {
        $panel.hide();
        $trigger.removeClass('is-open');
      }
    });
  });
});