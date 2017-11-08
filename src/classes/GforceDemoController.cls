public class GforceDemoController {
    @AuraEnabled
    public static String getAmount(Integer productNum, String quantity) {

        GoogleForce gForce = new GoogleForce('dreamforce');
        GoogleSheets sheets = new GoogleSheets(gForce);
        productNum += 1;
        String cellRange = 'B' + productNum + ':C' + productNum;

        GoogleSheets.ValueRange valueRange = new GoogleSheets.ValueRange()
            .setMajorDimension('ROWS')
            .setValues(new List<List<String>>{
                new List<String>{ quantity }
            });

        GoogleSheets.UpdateValuesResponse valsResp = sheets.spreadsheets().values().updateRange(
            '1OG3iEFN-prmiIS7Fqhd078WUyid_9Na97lroinaHu3I', cellRange, valueRange)
            .setIncludeValuesInResponse(true)
            .setValueInputOption('USER_ENTERED')
            .execute();

        System.debug(valsResp);
        System.debug(valsResp.getUpdatedData());
        System.debug(valsResp.getUpdatedData().getValues().get(0).get(1));

        gForce.updateToken();
        return valsResp.getUpdatedData().getValues().get(0).get(1);
    }
}