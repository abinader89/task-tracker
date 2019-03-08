import css from "../css/app.scss";
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

var tb_path = "ajax/timeblocks";
$(function () {
    $('#timeblock-button').click((ev) => {
        let timeblock_start = $('#timeblock-start').val();
        let timeblock_end = $('#timeblock-end').val();
        let task_id = $(ev.target).data('task-id');

        let text = JSON.stringify({
            time_block: {
                end: timeblock_end,
                start: timeblock_start,
                task_id: task_id,
            },
        });

        $('#timeblock-start').val('');
        $('#timeblock-end').val('');
        
        console.log(text);

        $.ajax(tb_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: (resp) => {
                $('#timeblock-button').text(`Timeblock Assigned`);
            },
        });
    });
});
