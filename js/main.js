$(document).ready(function() {
  $('input[type="radio"], input[type="range"],input[type="checkbox"], #miniClipQuantity').on('input', updatePrices);

  // Enable or disable the mini clips input number based on the selected radio
  $('input[type="radio"]').change(function() {
      var cardBody = $(this).closest('.card-body');
      if ($(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
          cardBody.find('#miniClipQuantity').prop('disabled', false);
      } else {
          cardBody.find('#miniClipQuantity').prop('disabled', true).val(0);
      }
  });

  function updatePrices() {
      var cardBody = $(this).closest('.card-body');
      var groupTotal = 0;

      var selectedRadio = cardBody.find('input[type="radio"]:checked');
      var radioPrice = Number(selectedRadio.data('price'));
      groupTotal += isNaN(radioPrice) ? 0 : radioPrice;

      // Deselect all radios when a new radio is selected
      if ($(this).is(':radio')) {
          cardBody.find('input[type="radio"]').not(this).prop('checked', false);
      }

      // Update the ad prices based on the sliders
      if (selectedRadio.is('#shortAd') || selectedRadio.is('#largeAd') || selectedRadio.is('#explanatoryVideo')) {
          var sliderId = '#' + selectedRadio.attr('id') + 'Slider';
          var duration = Number(cardBody.find(sliderId).val());
          var minPrice = Number(selectedRadio.data('price'));
          var maxPrice = minPrice * 2;
          var minDuration = Number(cardBody.find(sliderId).attr('min'));
          var maxDuration = Number(cardBody.find(sliderId).attr('max'));
          var adPrice = minPrice + (duration - minDuration) * ((maxPrice - minPrice) / (maxDuration - minDuration));
          adPrice = Number(adPrice.toFixed(2));
          cardBody.find('#' + selectedRadio.attr('id') + 'Price').text(adPrice);
          radioPrice = adPrice;
          groupTotal = radioPrice;
      }

      cardBody.find('input[type="checkbox"]:checked').each(function() {
          if ($(this).is('#expressShortAd')) {
            groupTotal *= 1.25;
          }
          if ($(this).is('#subtitlePro')) {
            groupTotal += 1000;
          }
      });

      var miniClipQuantity = cardBody.find('#miniClipQuantity').val();
      var miniClipPrice = miniClipQuantity * 500;
      groupTotal += miniClipPrice;

      cardBody.find('#groupTotal').text(groupTotal.toFixed(2));

      var total = 0;
      $('.card-body').each(function() {
          total += Number($(this).find('#groupTotal').text());
      });

      $('#total').text(total.toFixed(2));
  }
});
