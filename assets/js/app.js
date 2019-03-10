import css from "../css/app.scss";
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

var tb_path = "ajax/timeblocks/";
var moment = require('moment');
var started_working = false;

// create a timeblock
$(function () {
    $('#create-timeblock').click((ev) => {
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

        if (started_working
		|| delta < 0)
        {
            window.alert("Something went wrong...");
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
            $('#create-timeblock').text(`Timeblock Assigned`);
                console.log("success!");
                setTimeout(function(){ location.reload(); }, 2000);
            },
        });
    });
});

// delete a timeblock
$(function () {
    $('#delete-timeblock').click((ev) => {
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
                $('#delete-timeblock').text(`Timeblock Deleted`);
                    console.log("success!");
                    setTimeout(function(){ location.reload(); }, 2000);
            },
        });
    });
});

// update a timeblock
$(function () {
    $('#edit-timeblock').click((ev) => {
        let timeblocktime_start = $('#edit-start-timeblock-time').val();
        let timeblockdate_start = $('#edit-start-timeblock-date').val();
        let timeblocktime_end = $('#edit-end-timeblock-time').val();
        let timeblockdate_end = $('#edit-end-timeblock-date').val();
        let task_id = $(ev.target).data('task-id');
        let timeblock_id = $('#edit-timeblock-select').val();

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

        $('#edit-start-timeblock-time').val('');
        $('#edit-start-timeblock-date').val('');
        $('#edit-end-timeblock-time').val('');
        $('#edit-end-timeblock-date').val('');

        $.ajax(tb_path + timeblock_id, {
            method: "patch",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: (resp) => {
            $('#create-timeblock').text(`Timeblock Assigned`);
                console.log("success!");
                setTimeout(function(){ location.reload(); }, 2000);
            },
        });
    });
});

var working_start;
var working_end;

// start and stop working
$(function () {
    $('#start-working').click((ev) => {
        if (started_working)
        {
            let task_id = $(ev.target).data('task-id');
            working_end = moment().format('YYYY-MM-DD HH:mm');
            let start = moment(working_start, 'YYYY-MM-DD HH:mm');
            let end = moment(working_end, 'YYYY-MM-DD HH:mm');
            var delta = end - start;
            delta /= 60000 

            let text = JSON.stringify({
                time_block: {
                    end: working_end,
                    start: working_start,
                    delta: delta,
                    task_id: task_id,
                },
            });

            $.ajax(tb_path, {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: text,
                success: (resp) => {
                    $('#start-working').text(`Start Working`);
                    $('#start-working').css('background-color', 'green');
                    console.log('stopped working at: ' + working_end);
                    started_working = false; 
	            location.reload();
            },
        });
        } else {
            working_start = moment().format('YYYY-MM-DD HH:mm');
            $('#start-working').text(`Stop Working`);
            $('#start-working').css('background-color', 'red');
            console.log('started working at: ' + working_start);
            started_working = true;

            return;
        }
    });
});
