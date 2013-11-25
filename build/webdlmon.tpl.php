
	<div id="app" class="container">
		<header>

			<a href="/"><h2 id="page-title">web<span class="offcolor">dl</span>mon</h2></a>
			<p>When you load this page, data will begin to stram in automatically, if it does not, click the <i class="clockwise icon"></i> (refresh) button below. If you would like to freeze the data as is, press the <i class="pause icon"></i> (pause) button located next to the refresh button at the bottom of the table.</p>
		
		</header>


		<main id="content">

			<div id="region-menu" class="ui secondary pointing menu">
				<a class="item" data-action="overview">
					<i class="block layout icon"></i> Overview
					<div class="floating circular ui red label"></div>
				</a>
				<a class="item" data-action="details">
					<i class="grid layout icon"></i> Details
				</a>
			</div>

			<div id="message-region"></div>
			<div id="region-data"></div>

		</main>
	</div>

	<div class="ui modal">
		<!-- Display charts and detailed data here -->
	</div>

	<div id="spinner" class="hidden">
		<!-- Display spin.js spinner here -->
	</div>

	

<!-- WebDLMon Application -->
<script src='<?php print $module_path; ?>build/require.js' data-main='<?php print $module_path; ?>build/app'></script>
