function ChannelConsole(enabled = true)
{
	this.enabled = enabled;

	this.channels = {};

	// -----------------------------------------
	this.addChannel = function(channel_name)
	{ 
		var new_channel = {};
		new_channel["enabled"] = this.enabled;
		this.channels[channel_name] = new_channel; 
	}

	// -----------------------------------------
	this.setChannelEnabled = function(channel_name, enabled) {
		// HAZARD: exception if channel_name doesn't exist, so don't mess up
		this.channels[channel_name].enabled = enabled;
	}

	// -----------------------------------------
	this.isChannelEnabled = function(channel_name)
	{
		var enabled = false;
		if (this.channels[channel_name]) {
			enabled = this.channels[channel_name].enabled;
		}
		return enabled;
	}

	// -----------------------------------------
	this.log = function(channel_name, message)
	{
		if (!this.channels[channel_name]) {
			this.addChannel(channel_name, this.enabled);
		}

		if (this.enabled && this.isChannelEnabled(channel_name)) {
			console.log(`${channel_name}: ` + message);
		}
	}

	return this;
}

window.my_console = new ChannelConsole(true);
window.my_console.addChannel("trace");
window.my_console.setChannelEnabled("trace", false);

window.my_console.addChannel("notify");

// ============================================================================
// ----------------------------------------------------------------------------
// returns array of discovered jobs
// [ {name:string, link:string }, ...]
function getGFJobs()
{
	window.my_console.log("trace", "getGFJobs()");

	var jobs = []; 

	$("a.editable-title").each( function(index) 
	{ 
		if (this.href) 
		{ 
			var $current_a = $(this);
			var $childs = $current_a.children(".gf-editable-text");

			$childs.each( function(index) {	
				var current_job = {	name: $(this).text(), 
							link:"https://app.glowforge.com" + $current_a.attr("href") };
				jobs.push(current_job);			 
			});	

		}

	} );

	return jobs;
};

// ----------------------------------------------------------------------------
// adds discovered GF jobs to jobs_container
function addNewJobs(all_jobs, jobs_container)
{
	window.my_console.log("trace", "addNewJobs()");

	all_jobs.forEach( function(cur_job) {
		if (cur_job.name !== "" && !jobs_container[cur_job.name]) {
			my_console.log("notify", `new job found: ${cur_job.name}`);
			jobs_container[cur_job.name] = { name:cur_job.name, link: cur_job.link };
		}
	});

	return jobs_container;
}

// ----------------------------------------------------------------------------
function scanForNewJobs(my_jobs_object)
{
	window.my_console.log("trace", "scanForNewJobs()");

	const old_length = Object.keys(my_jobs_object).length;

	// get job elements
	var current_jobs = getGFJobs();

	// scan for new ones
	addNewJobs(current_jobs, my_jobs_object);

	// check diff
	const new_length = Object.keys(my_jobs_object).length;

	if (old_length !== new_length) {
		window.my_console.log("notify", `   discovered ${new_length - old_length} new jobs`);
		window.my_console.log("notify", `   total discovered: ${new_length}`);
	}
}

// ----------------------------------------------------------------------------
// adds scroll handler that will watch for and add new jobs to my_jobs_array
function installScrollHandler(my_jobs_object)
{
	window.my_console.log("trace", "installScrollHandler()");

	$(window).on('scroll', function() 
	{ 
		scanForNewJobs(my_jobs_object);
	});

	window.my_console.log("notify", "scroll handler installed");
}

// ----------------------------------------------------------------------------
// converts jobs array to formatted string
// Receives:
//	jobs: { name:{name:string, link:string}, ... }
function jobsToString(jobs)
{
	window.my_console.log("trace", "jobsToString()");

	var toString = "";
	Object.keys(jobs).forEach( function(cur_job_key) {
		var cur_job = jobs[cur_job_key];
		var cur_name = cur_job.name.trim();
		toString += `${cur_name}\t${cur_job.link}\n`;
	});

	return toString;
};

// ----------------------------------------------------------------------------
function startJobWatch() 
{
	window.my_console.log("trace", "startJobWatch()");

	window.my_console.log("notify", "staring job watch...");

	window.my_jobs = {};

	scanForNewJobs(window.my_jobs);

	installScrollHandler(window.my_jobs);

	window.my_console.log("notify", "now watching for new jobs");
}



