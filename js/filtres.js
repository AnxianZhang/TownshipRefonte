
function getEmployeeFilterOptions() {
    var opts = [];
    $checkboxes.each(function () {
        if (this.checked) {
            opts.push(this.name);
        }
    });
    return opts;
}
function updateEmployees(opts) {
    $.ajax({
        type: "POST",
        url: "filtres.php",
        dataType: 'json',
        //    cache: false,
        data: { filterOpts: opts },
        success: function (records) {
            $('#choix').append(
                $(document.createElement('button')).prop({
                    type: 'button',
                    innerHTML: records
                    // class: 'btn-styled'
                })
            );
            // $('#choix').html(makeTable(records));
        }
    });
}
var $checkboxes = $("input:checkbox");
$checkboxes.on("change", function () {
    var opts = getEmployeeFilterOptions();
    updateEmployees(opts);
});
updateEmployees();






