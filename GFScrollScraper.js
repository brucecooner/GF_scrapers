// ============================================================================
// GF dashboard scraper
// scrapes GlowForge job links from page, updates list as page is scrolled,
// can output discovered lists to console in tabular form
// ============================================================================
// usage: 
// * log in to your Glowforge dashboard
// * open browser developer console
// * paste this ENTIRE file into the console and press enter
// * follow instructions that appear in console

// =============================== USE AND LICENSING INFO ===============================
// USE THIS SOFTWARE AT YOUR OWN RISK! If you mess up your stuff, I'm not responsible.
// No warranty is expressed nor implied, and this software may cease to function at any time due to unforeseen changes.
// This software is NOT endorsed in any way by The Glowforge corporation, and is offered on an as-is basis for personal, non-commercial use ONLY.
// This software may NOT be distributed or altered and re-distributed without the author's consent, and may NOT be incorporated into commerical projects.


// ============================================================================
// tiny channel-aware console log
// create: my_console = new ChannelConsole();
// make a channel: my_console.addChannel("trace");
// make lots of channels!
// make a channel: my_console.addChannel("todo");
// use channels by calling their name:
// my_console.trace("someFunctionName()");
// my_console.todo("optimize this func.");
// silence a channel:
// my_console.setChannelEnabled("trace", false);
function ChannelConsole(enabled = true)
{
	this.enabled = enabled;

	this.channels = {};

	// -----------------------------------------
	this.addChannel = function(channel_name)
	{ 
		var owner_console = this;

		var new_channel = {};
		new_channel["enabled"] = this.enabled;
		this.channels[channel_name] = new_channel; 

		// outward facing log function with channel name
		this[channel_name] = function(message) {
			var channel = this.channels[channel_name];
			if (this.enabled && channel.enabled) {
				console.log(`${channel_name}: `, message);
			}
		};
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
		console.log("todo: switch channel " + channel_name + " to function");
	}

	return this;
}

window.my_console = new ChannelConsole(true);
window.my_console.addChannel("trace");
window.my_console.setChannelEnabled("trace", false);
window.my_console.addChannel("GFScraper");


// ============================================================================
// GF dashboard scraper
// ----------------------------------------------------------------------------
// returns array of discovered jobs
// [ {name:string, link:string }, ...]
function getGFJobs()
{
	window.my_console.trace("getGFJobs()");

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
// adds discovered GF jobs to jobs_container, with name as key
function addNewJobs(all_jobs, jobs_container)
{
	window.my_console.trace("addNewJobs()");

	all_jobs.forEach( function(cur_job) {
		if (cur_job.name !== "" && !jobs_container[cur_job.name]) {
			window.my_console.GFScraper(`new job found: ${cur_job.name}`);
			jobs_container[cur_job.name] = { name:cur_job.name, link: cur_job.link };
		}
	});

	return jobs_container;
}

// ----------------------------------------------------------------------------
function scanForNewJobs(my_jobs_object)
{
	window.my_console.trace("scanForNewJobs()");

	const old_length = Object.keys(my_jobs_object).length;

	// get job elements
	var current_jobs = getGFJobs();

	// scan for new ones
	addNewJobs(current_jobs, my_jobs_object);

	// check diff
	const new_length = Object.keys(my_jobs_object).length;

	if (old_length !== new_length) {
		window.my_console.GFScraper(`   discovered ${new_length - old_length} new jobs`);
		window.my_console.GFScraper(`   total discovered: ${new_length}`);
	}
}

// ----------------------------------------------------------------------------
// adds scroll handler that will watch for and add new jobs to my_jobs_array
function installScrollHandler(my_jobs_object)
{
	window.my_console.trace("installScrollHandler()");

	$(window).on('scroll', function() 
	{ 
		scanForNewJobs(my_jobs_object);
	});

	window.my_console.GFScraper("scroll handler installed");
}

// ----------------------------------------------------------------------------
// converts jobs array to formatted string
// Receives:
//	jobs: { name:{name:string, link:string}, ... }
function jobsToString(jobs)
{
	window.my_console.trace("jobsToString()");

	var toString = "";
	Object.keys(jobs).forEach( function(cur_job_key) {
		var cur_job = jobs[cur_job_key];
		var cur_name = cur_job.name.trim();
		toString += `${cur_name}\t${cur_job.link}\n`;
	});

	return toString;
};

// ----------------------------------------------------------------------------
function startScrollScraper() 
{
	window.my_console.trace("startScrollScraper()");

	window.my_console.GFScraper("starting job watch...");

	window.my_jobs = {};

	scanForNewJobs(window.my_jobs);

	installScrollHandler(window.my_jobs);

	window.my_console.GFScraper("now watching for new jobs");
}

// ----------------------------------------------------------------------------
function getJobsTable()
{
	var tableString = jobsToString(window.my_jobs);

	console.log(tableString);
}

window.my_console.GFScraper("1. type startScrollScraper() when ready to begin");
window.my_console.GFScraper("2. scroll slowly through all your jobs in the dashboard.");
window.my_console.GFScraper("(you should see updates from the scraper as you scroll)");
window.my_console.GFScraper("2. upon reaching the bottom of your job list, type getJobsTable() in the console.");
window.my_console.GFScraper("3. copy the (possibly large) string from the developer console and paste into an empty google sheet.");
window.my_console.GFScraper("(it may work with other spreadsheets, has only been tested with G sheets)");



