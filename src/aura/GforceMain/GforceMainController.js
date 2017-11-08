({
    productSelectHandler: function(cmp, event, helper) {

        var productName = event.getSource().get('v.name');
        var productQuantityList = cmp.find('product-quantity');
        var amountDomElement = helper.findAmountElement(cmp, productName);

        for (var i = 0; i < productQuantityList.length; i++) {

            if (productQuantityList[i].get('v.name') === productName + '-quantity') {
                $A.util.toggleClass(productQuantityList[i], 'slds-hide');
                productQuantityList[i].set('v.value', null);
                if (amountDomElement) {
                    amountDomElement.textContent = '';
                }
                break;
            }
        }
    },

    quantityEnteredHandler: function(cmp, event, helper) {

        var productName = event.getSource().get('v.name').replace('-quantity', '');
        var productQuantity = event.getSource().get('v.value');
        var productAmountList = cmp.find('product-amount');

        var amountDomElement = helper.findAmountElement(cmp, productName);

        var getAmountHandler = cmp.get('c.getAmount');
        getAmountHandler.setParams({
            productNum: productName.slice(-1),
            quantity: productQuantity
        });
        getAmountHandler.setCallback(this, function(resp) {
            amountDomElement.textContent = '$' + resp.getReturnValue();
        });

        if (productQuantity) {
            $A.enqueueAction(getAmountHandler);
        } else {
            amountDomElement.textContent = '';
        }
    }
})