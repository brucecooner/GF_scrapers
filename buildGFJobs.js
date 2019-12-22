// ----------------------------------------------------------------------------
function getMyGFJobs()
{
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
function jobsToString(jobs)
{
	var toString = "";
	jobs.forEach( function(cur_job) {
		var cur_name = cur_job.name.trim();
		toString += `${cur_name}\t${cur_job.link}\n`;
	});

	return toString;
};

// ---------------------------------------------------------------------------
function getMyJobsString()
{
	var my_jobs = getMyGFJobs();
	var my_jobs_string = jobsToString(my_jobs);

	return my_jobs_string;
};
