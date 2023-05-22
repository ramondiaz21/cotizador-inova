$(document).ready(function () {
    $('input[type="checkbox"], input[type="range"], #miniClipQuantity').on('input', updatePrices);

    // Enable or disable the mini clips input number based on the selected checkbox
    $('input[type="checkbox"]').change(function () {
        var cardBody = $(this).closest('.card-body');
        if ($(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
            cardBody.find('#miniClipQuantity').prop('disabled', !this.checked);
        }
    });

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            if ($(this).is('#lite') || $(this).is('#pro') || $(this).is('#shortAd') || $(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
                var price = Number($(this).data('price'));
                groupTotal += isNaN(price) ? 0 : price;

                if ($(this).is('#shortAd') || $(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
                    var sliderId = '#' + $(this).attr('id') + 'Slider';
                    var duration = Number(cardBody.find(sliderId).val());
                    var minPrice = Number($(this).data('price'));
                    var maxPrice = minPrice * 2;
                    var minDuration = Number(cardBody.find(sliderId).attr('min'));
                    var maxDuration = Number(cardBody.find(sliderId).attr('max'));
                    var adPrice = minPrice + (duration - minDuration) * ((maxPrice - minPrice) / (maxDuration - minDuration));
                    adPrice = Number(adPrice.toFixed(2));
                    cardBody.find('#' + $(this).attr('id') + 'Price').text(adPrice);
                    groupTotal = groupTotal - price + adPrice;
                }
            }

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
        $('.card-body').each(function () {
            total += Number($(this).find('#groupTotal').text());
        });

        $('#total').text(total.toFixed(2));
    }
});