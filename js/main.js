$(document).ready(function () {
  $('input[type="radio"], input[type="checkbox"], input[type="range"], #miniClipLargeAdQuantity, #miniClipExplanatoryVideoQuantity').on('input', updatePrices);

  // Enable or disable the mini clips checkbox based on the selected radio
  $('input[type="radio"]').change(function () {
    var cardBody = $(this).closest('.card-body');
    if ($(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
      cardBody.find('#miniClipLargeAd').prop('disabled', false);
      cardBody.find('#miniClipExplanatoryVideo').prop('disabled', false);
    } else {
      cardBody.find('#miniClipLargeAd').prop('disabled', true).prop('checked', false);
      cardBody.find('#miniClipExplanatoryVideo').prop('disabled', true).prop('checked', false);
    }
  });

  function updatePrices() {
    var groupTotal = 0;
    var cardBody = $(this).closest('.card-body');
    var selectedRadio = cardBody.find('input[type="radio"]:checked');
    var radioPrice = Number(selectedRadio.data('price'));
    groupTotal += isNaN(radioPrice) ? 0 : radioPrice;

    // Deselect all radios when a radio is selected
    if ($(this).is(':radio')) {
      cardBody.find('input[type="radio"]').not(this).prop('checked', false);
    }

    // Update the short ad price based on the slider
    if (selectedRadio.is('#shortAd')) {
      var shortAdSlider = cardBody.find('#shortAdSlider');
      var shortAdDuration = Number(shortAdSlider.val());
      $('#shortAdDuration').text(shortAdDuration); // Update the displayed duration
      var shortAdPrice = 5000 + (shortAdDuration - 15) * ((10000 - 5000) / (30 - 15));
      shortAdPrice = Math.round((shortAdPrice + Number.EPSILON) * 100) / 100; // Round to 2 decimal places
      $('#shortAdPrice').text(shortAdPrice);
      radioPrice = shortAdPrice;
      groupTotal = radioPrice;
    }

    // Update the large ad price based on the slider
    if (selectedRadio.is('#largeAd')) {
      var largeAdSlider = cardBody.find('#largeAdSlider');
      var largeAdDuration = Number(largeAdSlider.val());
      $('#largeAdDuration').text(largeAdDuration); // Update the displayed duration
      var largeAdPrice = 10000 + (largeAdDuration - 30) * ((20000 - 10000) / (60 - 30));
      largeAdPrice = Math.round((largeAdPrice + Number.EPSILON) * 100) / 100; // Round to 2 decimal places
      $('#largeAdPrice').text(largeAdPrice);
      radioPrice = largeAdPrice;
      groupTotal = radioPrice;
    }

    // Update the large ad price based on the slider
    if (selectedRadio.is('#explanatoryVideo')) {
      var explanatoryVideoSlider = cardBody.find('#explanatoryVideoSlider');
      var explanatoryVideoDuration = Number(explanatoryVideoSlider.val());
      $('#explanatoryVideoDuration').text(explanatoryVideoDuration); // Update the displayed duration
      var explanatoryVideoPrice = 10000 + (explanatoryVideoDuration - 30) * ((20000 - 10000) / (60 - 30));
      explanatoryVideoPrice = Math.round((explanatoryVideoPrice + Number.EPSILON) * 100) / 100; // Round to 2 decimal places
      $('#explanatoryVideoPrice').text(explanatoryVideoPrice);
      radioPrice = explanatoryVideoPrice;
      groupTotal = radioPrice;
    }

    

    cardBody.find('input[type="checkbox"]:checked').each(function () {
      var extra = Number($(this).data('extra'));
      var extraPrice = isNaN(extra) ? Number($(this).data('price')) : radioPrice * extra;
      groupTotal += isNaN(extraPrice) ? 0 : extraPrice;
    });

    if (cardBody.find('#miniClipLargeAd').is(':checked') && selectedRadio.is('#largeAd')) {
      var miniClipPrice = Number(cardBody.find('#miniClipLargeAdQuantity').val()) * 500;
      $('#largeAdPrice').text(radioPrice + miniClipPrice); // Update the large ad price with mini clips
      groupTotal += miniClipPrice;
    }

    cardBody.find('#groupTotal').text(groupTotal);

    var total = 0;
    $('.card-body').each(function () {
      total += Number($(this).find('#groupTotal').text());
    });

    $('#total').text(total);
  }
});