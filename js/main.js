$(document).ready(function() {
  $('input[type="radio"], input[type="checkbox"], input[type="range"]').change(updatePrices);

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

      cardBody.find('input[type="checkbox"]:checked').each(function() {
          var extra = Number($(this).data('extra'));
          var extraPrice = isNaN(extra) ? Number($(this).data('price')) : radioPrice * extra;
          groupTotal += isNaN(extraPrice) ? 0 : extraPrice;
      });

      cardBody.find('#groupTotal').text(groupTotal);

      var total = 0;
      $('.card-body').each(function() {
          total += Number($(this).find('#groupTotal').text());
      });

      $('#total').text(total);
  }

  $('#shortAd').change(function() {
      if ($(this).is(':checked')) {
          $('#shortAdSlider').change();
      }
  });
});
