export class AjaxRequest {
    constructor(url, dataType, succesFunction, data, errorFunction) {
        this.url = url;
        this.dataType = dataType;
        this.data = data;
        this.succesFunction = succesFunction;
        this.errorFunction = errorFunction;
    }

    doAjaxtRequest() {
        $.ajax({
            async: true,
            type: "POST",
            dataType: this.dataType,
            url: this.url,
            data: this.data,
            success: (data) => {
                this.succesFunction(data);
            },
            error: (error) => {
                this.errorFunction(error);
            },
        });
    }
}