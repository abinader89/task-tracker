import css from "../css/app.scss";
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

var date = require('moment');
var tb_path = "ajax/timeblocks/";
var moment = require('moment');

var create_buttons = document.getElementsByClassName("timeblock-form-create");
var delete_buttons = document.getElementsByClassName("timeblock-form-delete");
var edit_buttons = document.getElementsByClassName("timeblock-form-edit");

// create a timeblock
$(function () {
    $('#timeblock-button').click((ev) => {
        let timeblocktime_start = $('#start-timeblock-time').val();
        let timeblockdate_start = $('#start-timeblock-date').val();
        let timeblocktime_end = $('#end-timeblock-time').val();
        let timeblockdate_end = $('#end-timeblock-date').val();
        let task_id = $(ev.target).data('task-id');

        let timeblock_start = timeblockdate_start + " " + timeblocktime_start;
        let timeblock_end = timeblockdate_end + " " + timeblocktime_end;
        var start = moment(timeblock_start, 'YYYY-MM-DD HH:mm');
        var end = moment(timeblock_end, 'YYYY-MM-DD HH:mm');
        var delta = end - start;
        delta /= 60000 

        if (delta < 0)
        {
            window.alert("Unexpected format, try again.");
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

        $('#start-timeblock-time').val('');
        $('#start-timeblock-date').val('');
        $('#end-timeblock-time').val('');
        $('#end-timeblock-date').val('');
        
        $.ajax(tb_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: (resp) => {
            $('#timeblock-button').text(`Timeblock Assigned`);
                window.location.reload();
            },
        });
    });
});

// delete a timeblock
$(function () {
    $('#timeblock-button-delete').click((ev) => {
        let timeblock_id = $('#delete-timeblock').val();
        
        var delete_confirm = 'Do you really want to delete this timeblock?';

        if (!delete_confirm)
        {
            return;
        }
        tb_path += timeblock_id;
        $.ajax(tb_path, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                $('#timeblock-button-delete').text(`Timeblock Deleted`);
                window.location.reload();
            },
        });
    });
});
