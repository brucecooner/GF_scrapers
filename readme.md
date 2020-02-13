A scraper for the GlowForge dashboard that pulls out the names and links to all of the jobs it finds, with a little help (see below).

Cuz if you're like me sometimes you're looking for that thing you printed like, eight months ago and you can remember part of the name, but it's gone way down in your list and you have to scroll slowly through pages of jobs squinting at thumbnails because there's no global search. I suspect Glowforge will improve this someday, but as long as they just keep making those sweet laser cutters I'm not going to complain.

Anyway, with some manual labor on your part, this scraper will help you build a great big table of all your GF jobs and direct links to those jobs, which you can drop into a spreadsheet or other document for easy searching.

It requires some technical savvy to use, but if you're browsing github you probably have the tech chops to use it.

Log into your dashboard, paste the entire GFScrollScraper.js file into the browser developer console, and follow the instructions which appear in the console.

Since your job list isn't all loaded upon opening the dashboard, you'll have to scroll through your entire job history and let the scraper pick them all up (this is the manual labor I mentioned). 

Once you've scrolled to the bottom of your list, you'll type another command into the developer console and the scraper will produce a tabbed list of your jobs, with links, suitable for copy/pasting into a Google Sheet (might work with other sheets, I haven't tried any).
From the sheet you can more easily search your whole entire job list, then just follow the associated link to go straight to the designer app with that job loaded.

Tested with Firefox (72.0), might even work with other browsers.

=============================== USE AND LICENSING INFO ===============================
USE THIS SOFTWARE AT YOUR OWN RISK! If you mess up your stuff, I'm not responsible.
No warranty is expressed nor implied, and this software may cease to function at any time due to unforeseen changes.
This software is NOT endorsed in any way by The Glowforge corporation, and is offered on an as-is basis for personal, non-commercial use ONLY.
This software may NOT be distributed or altered and re-distributed without the author's consent, and may NOT be incorporated into commerical projects.
