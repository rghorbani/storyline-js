
var job_id;
// var server_url = 'http://localhost/test/';
var server_url = 'http://citest.troplat.ir/';

$('body').on('click', '#search', function(e) {
	e.preventDefault();
	$('.loading-modal').modal({
		keyboard: false,
		backdrop: 'static'
	});
	var query_word = $('#query-form input#queryWord').val();
	var begin_date;
	var end_date;
	console.log('query is: ' + query_word + ' from "' + begin_date + '"" to "' + end_date + '".');
	/*
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: server_url + 'story/submit_query',
		data: {
			query_word: query_word,
			begin_date: begin_date,
			end_date: end_date
		},
		error: function() {
			alert('Error occurred at job submitting check!!!');
			$('.loading-modal').modal('hide');
		},
		success: function(data) {
			job_id = data.job_id;
			checkProgress();
		},
	});
	*/
	checkProgress();
});

var retrieveData = function() {
	/*
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: server_url + 'story/get_data',
		data: {
			job_id: job_id
		},
		error: function() {
			alert('Error occurred at retrieving data!!!');
			retrieveData();
		},
		success: function(result) {
			console.log('Data retrieved.');
			console.log(result);
			timeline_config.source = result.data;
			$('body .container').hide();
			runningStoryline();
			$('#timeline-embed').show();
			$('.loading-modal').modal('hide');
		},
	});
	*/
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'story13.json',
		data: {
		},
		error: function() {
			alert('Error occurred at retrieving data!!!');
			retrieveData();
		},
		success: function(result) {
			console.log('Data retrieved.');
			console.log(result);
			timeline_config.source = result;
			$('body .container').hide();
			runningStoryline();
			$('#timeline-embed').show();
			$('.loading-modal').modal('hide');
		},
	});
};

var checkProgress = function() {
	var progress = parseInt($('div.loading div.progress-bar').attr('aria-valuenow'));
	setTimeout(function() {
		progress = $('#timeline-loading').attr('aria-valuenow');
		progress = parseInt(progress);
		console.log('Progress is at: ' + progress + ' percent.');
		/*
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: server_url + 'story/check_progress',
			data: {
				job_id: job_id,
				progress: progress
			},
			error: function() {
				alert('Error occurred at progress check!!!');
				if(progress < 100) {
					checkProgress();
				}
			},
			success: function(data) {
				$('#timeline-loading').attr('aria-valuenow', data.progress);
				$('#timeline-loading').attr('style', 'width: ' + data.progress + '%;');
				$('#timeline-loading').html(data.progress + '%');
				if(parseInt(data.progress) < 100) {
					checkProgress();
				} else {
					retrieveData();
				}
			},
		});
		*/
		progress += 20;
		$('#timeline-loading').attr('aria-valuenow', progress);
		$('#timeline-loading').attr('style', 'width: ' + progress + '%;');
		$('#timeline-loading').html(progress + '%');
		if(parseInt(progress) < 100) {
			checkProgress();
		} else {
			retrieveData();
		}
	}, 1000);
};
