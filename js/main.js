$(document).ready(function () {
    collapseOne();
    collapseTwo();
    collapseThree();
    collapseFour();
    collapseFive();
    collapseSeven();
    updateTotal();
});

function collapseOne() {
    $('#collapseOne input[type="checkbox"], #collapseOne input[type="range"], #collapseOne #miniClipQuantity').on('input', updatePrices);

    $('#collapseOne input[type="range"]').on('input', function () {
        var sliderId = $(this).attr('id');
        var labelId = '#' + sliderId.replace('Slider', 'Duration');
        $(labelId).text($(this).val());
    });
    
    $('#collapseOne input[type="checkbox"]').change(function () {
        if ($(this).is('#largeAd') || $(this).is('#explanatoryVideo')) {
            $('#collapseOne #miniClipQuantity').prop('disabled', !this.checked);
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
        updateTotal();
    }

}

function collapseTwo() {

    $('#collapseTwo input[type="checkbox"], #collapseTwo input[type="number"]').on('input', updatePricesFotografia);

    $('#collapseTwo input[type="checkbox"]').change(function () {
        var inputNumber = $(this).parent().next().find('input[type="number"]');
        inputNumber.prop('disabled', !this.checked);
    });

    function updatePricesFotografia() {
        var groupTotalFotografia = 0;

        $('#collapseTwo input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotalFotografia += isNaN(price) ? 0 : price;
        });

        $('#collapseTwo input[type="number"]').each(function () {
            if (!$(this).prop('disabled')) {
                var price = Number($(this).data('price'));
                groupTotalFotografia += isNaN(price) ? 0 : price * $(this).val();
            }
        });

        $('#groupTotalFotografia').text(groupTotalFotografia.toFixed(2));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(total.toFixed(2));
    }
}

function collapseThree() {
    $('#collapseThree input[type="checkbox"]').on('input', updatePricesPublicidadPagada);

    function updatePricesPublicidadPagada() {
        var groupTotalPublicidadPagada = 0;

        $('#collapseThree input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotalPublicidadPagada += isNaN(price) ? 0 : price;
        });

        $('#groupTotalPublicidadPagada').text(groupTotalPublicidadPagada.toFixed(2));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(total.toFixed(2));
    }
}

function collapseFour() {
    $('#collapseFour input[type="checkbox"]').on('input', updatePricesCommunityManagement);

    function updatePricesCommunityManagement() {
        var groupTotalCommunityManagement = 0;

        $('#collapseFour input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotalCommunityManagement += isNaN(price) ? 0 : price;
        });

        $('#groupTotalCommunityManagement').text(groupTotalCommunityManagement.toFixed(2));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(total.toFixed(2));
    }
}

function collapseFive() {
    $('#collapseFive input[type="checkbox"]').on('input', updatePricesPaginasWeb);

    function updatePricesPaginasWeb() {
        var groupTotalPaginasWeb = 0;

        $('#collapseFive input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotalPaginasWeb += isNaN(price) ? 0 : price;
        });

        $('#groupTotalPaginasWeb').text(groupTotalPaginasWeb.toFixed(2));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(total.toFixed(2));
    }
}

function collapseSeven() {
    $('#collapseSeven input[type="checkbox"]').on('input', updatePricesPaginasWebCopy);

    $('#pwc_paquete3').change(function () {
        var isPaquete3Checked = this.checked;
        $('#pwc_extras1, #pwc_extras2').prop('disabled', !isPaquete3Checked);
    });

    function updatePricesPaginasWebCopy() {
        var groupTotalPaginasWebCopy = 0;

        $('#collapseSeven input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotalPaginasWebCopy += isNaN(price) ? 0 : price;
        });

        $('#groupTotalPaginasWebCopy').text(groupTotalPaginasWebCopy.toFixed(2));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(total.toFixed(2));
    }
}

function updateTotal() {
    var total = 0;
    $('.groupTotal').each(function () {
        total += Number($(this).text());
    });

    $('#total').text(total.toFixed(2));
}