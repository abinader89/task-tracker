import css from "../css/app.scss";
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

var date = require('moment');
var tb_path = "ajax/timeblocks";
var moment = require('moment');
$(function () {
    $('#timeblock-button').click((ev) => {
        let timeblock_start = $('#timeblock-start').val();
        let timeblock_end = $('#timeblock-end').val();
        let task_id = $(ev.target).data('task-id');

        console.log(timeblock_start.length);
        console.log(timeblock_end.length);


        var start = moment(timeblock_start);
        var end = moment(timeblock_end);
        var delta = end - start;
        delta /= 60000 
        console.log(delta);

        if (timeblock_start.length != 16
        || timeblock_end.length != 16
        || delta < 0)
        {
            window.alert("Unexpected format, check your input and try again.");
            return;
        }

        let text = JSON.stringify({
            time_block: {
                end: timeblock_end,
                start: timeblock_start,
                delta: delta,
                task_id: task_id,
            },
        });

        $('#timeblock-start').val('');
        $('#timeblock-end').val('');
        
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
