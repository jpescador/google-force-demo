({
    findAmountElement: function(cmp, productName) {
        var productAmountList = cmp.find('product-amount');

        for (var i = 0; i < productAmountList.length; i++) {
            var domElement = productAmountList[i].getElement();

            if (domElement.getAttribute('title').includes(productName)) {
                return domElement;
            }

        }
    }
})