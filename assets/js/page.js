
var job_id;
// var server_url = 'http://localhost/test/';
var server_url = 'http://citest.troplat.ir/';

var loadingImage = function(status) {
	if(status == true && $('body .loading')) {
		$('body').append('<div class="loading"><div class="prog col-xs-6 col-xs-offset-3"><div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">0%</div></div></div></div>');
		// $('body').addClass('dim');
	} else {
		$('body .loading').remove();
		// $('body').removeClass('dim');
	}
};

$('body').on('click', '#search', function(e) {
	e.preventDefault();
	loadingImage(true);
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
			loadingImage(false);
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
			loadingImage(false);
		},
	});
	*/
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: 'story15.json',
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
			loadingImage(false);
		},
	});
};

var checkProgress = function() {
	var progress = parseInt($('div.loading div.progress-bar').attr('aria-valuenow'));
	setTimeout(function() {
		progress = $('div.loading div.progress-bar').attr('aria-valuenow');
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
				$('div.loading div.progress-bar').attr('aria-valuenow', data.progress);
				$('div.loading div.progress-bar').attr('style', 'width: ' + data.progress + '%;');
				$('div.loading div.progress-bar').html(data.progress + '%');
				if(parseInt(data.progress) < 100) {
					checkProgress();
				} else {
					retrieveData();
				}
			},
		});
		*/
		progress += 20;
		$('div.loading div.progress-bar').attr('aria-valuenow', progress);
		$('div.loading div.progress-bar').attr('style', 'width: ' + progress + '%;');
		$('div.loading div.progress-bar').html(progress + '%');
		if(parseInt(progress) < 100) {
			checkProgress();
		} else {
			retrieveData();
		}
	}, 1000);
};
