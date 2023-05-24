$(document).ready(function () {
    collapseOne();
    collapseTwo();
    collapseThree();
    collapseFour();
    collapseFive();
    collapseSix();
    collapseSeven();
    collapseEight();
    collapseNine();
    collapseTen();
    collapseEleven();
    collapseTwelve();
    collapseThirteen();
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

        cardBody.find('#groupTotal').text(formatNumber(groupTotal));
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

        $('#groupTotalFotografia').text(formatNumber(groupTotalFotografia));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(formatNumber(groupTotalFotografia));
        updateTotal();
    }
}

function collapseThree() {
    $('#collapseThree input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalPublicidadPagada').text(formatNumber(groupTotal));

        updateTotal(); // Actualizar el valor total llamando a la función updateTotal()

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text().replace(/[^0-9.-]+/g, ''));
        });

        $('#total').text(formatNumber(total));
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

        $('#groupTotalCommunityManagement').text(formatNumber(groupTotalCommunityManagement));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(formatNumber(groupTotalCommunityManagement));
        updateTotal();
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

        $('#groupTotalPaginasWeb').text(formatNumber(groupTotalPaginasWeb));


        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(formatNumber(groupTotalPaginasWeb));
        updateTotal();
    }
}

function collapseSix() {
    $('#collapseSix input[type="checkbox"], #collapseSix #aplicacionesExtraQuantity').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        var aplicacionesExtraQuantity = cardBody.find('#aplicacionesExtraQuantity').val();
        var aplicacionesExtraPrice = aplicacionesExtraQuantity * 1000;
        groupTotal += aplicacionesExtraPrice;

        cardBody.find('#groupTotalDisenoBranding').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseSeven() {
    $('#collapseSeven input[type="checkbox"]').on('input', updatePricesPaginasWebCopy);

    $('#pwc_paquete3').change(function () {
        var isPaquete3Checked = this.checked;
        $('#pwc_extras1, #pwc_extras2').prop('disabled', !isPaquete3Checked);
    });

    function updatePricesPaginasWebCopy() {
        var groupTotal = 0;

        $('#collapseSeven input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        $('#groupTotalPaginasWebCopy').text(formatNumber(groupTotal));

        var total = 0;
        $('.groupTotal').each(function () {
            total += Number($(this).text());
        });

        $('#total').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseEight() {
    $('#collapseEight input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalExperienciasInmersivas').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseNine() {
    $('#collapseNine input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalSeo').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseTen() {
    $('#collapseTen input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalTiendaLinea').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseEleven() {
    $('#collapseEleven input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalMantenimiento').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseTwelve() {
    $('#collapseTwelve input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalAsesoria').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function collapseThirteen() {
    $('#collapseThirteen input[type="checkbox"]').on('input', updatePrices);

    function updatePrices() {
        var cardBody = $(this).closest('.card-body');
        var groupTotal = 0;

        cardBody.find('input[type="checkbox"]:checked').each(function () {
            var price = Number($(this).data('price'));
            groupTotal += isNaN(price) ? 0 : price;
        });

        cardBody.find('#groupTotalPlanesIntegrales').text(formatNumber(groupTotal));
        updateTotal();
    }
}

function formatNumber(num) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function updateTotal() {
    var total = 0;
    $('.groupTotal').each(function () {
        var groupTotalString = $(this).text();
        var groupTotalNumber = Number(groupTotalString.replace(/,/g, ''));
        total += groupTotalNumber;
    });

    $('#total').text(formatNumber(total));
}

document.getElementById("downloadPDF").onclick = function () {
    window.print();
    location.reload();
    //resetPage();
};

function resetPage() {
    // // Desmarca todos los checkboxes
    // const checkboxes = document.querySelectorAll('input[type=checkbox]');
    // checkboxes.forEach(checkbox => checkbox.checked = false);

    // // Restablece todos los sliders
    // const sliders = document.querySelectorAll('input[type=range]');
    // sliders.forEach(slider => slider.value = slider.min);

    // // Restablece todos los inputs de tipo numérico
    // const numberInputs = document.querySelectorAll('input[type=number]');
    // numberInputs.forEach(input => input.value = '');

    // // Limpiando la cotización total
    // document.getElementById('total').textContent = '0';

    // // Reiniciando todos los elementos con la clase 'groupTotal'
    // let groupTotals = document.getElementsByClassName('groupTotal');
    // for (let i = 0; i < groupTotals.length; i++) {
    //     groupTotals[i].textContent = '0';
    // }

    // // Cierra todos los collapses
    // $('.collapse').collapse('hide');
}