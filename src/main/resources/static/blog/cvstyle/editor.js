var id_document    	= $('#id_document').val(),
	$name 				= ".doc_name",
	$profession 		= '.doc_profession',
	$address 			= '.doc_address',
	$phone 			= '.doc_phone',
	$email 				= '.doc_email',
	$website 			= '.doc_website',
	$placeofbirth 		= '.doc_placeofbirth',
	$dateofbirth 		= '.doc_dateofbirth',
	$linkedin 			= '.doc_linkedin',
	$facebook 			= '.doc_facebook',
	$marital 			= '.doc_marital',
	$citizenship 		= '.doc_citizenship',
	$images 			= 'doc_images',
	$interest 			= '.doc_interest',
	$skill 				= '.doc_skill',
	$skillLevel 			= '.doc_level',
	$summary 			= '.doc_summary',
	$schoolname 		= '.doc_schoolname',
	$description 		= '.doc_description',
	$degree 			= '.doc_degree',
	$monthFromEdu 	= '.doc_MonthFromEdu',
	$yearFromEdu 		= '.doc_YearFromEdu',
	$monthToEdu 		= '.doc_MonthToEdu',
	$yearToEdu 		= '.doc_YearToEdu',
	$position 			= '.doc_position',
	$experience 		= '.doc_experience',
	$company      		= '.doc_company',
	$monthFromExp 	= '.doc_MonthFromExp',
	$yearFromExp 		= '.doc_YearFromExp',
	$monthToExp 		= '.doc_MonthToExp',
	$yearToExp 		= '.doc_YearToExp',
	$citydate           	= '.doc_city_date',
	$recipient          	= '.doc_recipient',
	$content            	= '.doc_content',
	$fluency            	= '.doc_fluency',
	$language           	= '.doc_language',
	$award   			= '.doc_award',
	$project            	= '.doc_project',
	$refer_profession  	= '.doc_refer_profession',
	$refer_phone        	= '.doc_refer_phone',
	$refer_name         	= '.doc_refer_name',
	$refer_email 		= '.doc_refer_email',
	$achievement       	= '.doc_achievement',
	$activity           	= '.doc_activity',
	$additional         	= '.doc_additional',

	$block_skills		= '#onecv-skills',
	$block_interests	= '#onecv-interests',
	$block_education	= '#onecv-education',
	$block_experience	= '#onecv-experience',
	$block_summary	= '#onecv-summary',
	$block_languages	= '#onecv-languages',
	$block_activities	= '#onecv-activities',
	$block_awards		= '#onecv-awards',
	$block_references	= '#onecv-references',
	$block_projects	= '#onecv-projects',
	$block_additional	= '#onecv-additional',
	$block_personal	= '#onecv-personal',

	$title_skills			= '.doc_title-skills',
	$title_interests		= '.doc_title-interests',
	$title_education	= '.doc_title-education',
	$title_experience	= '.doc_title-experience',
	$title_summary	= '.doc_title-summary',
	$title_languages 	= '.doc_title-languages',
	$title_activities	= '.doc_title-activities',
	$title_projects		= '.doc_title-projects',
	$title_additional	= '.doc_title-additional',
	$title_awards		= '.doc_title-awards',
	$title_references	= '.doc_title-references',

	$item 				= '.js_onecv-item',
	$id_main			= '#col-main',
	$id_side			= '#col-side',

	$listLetter_Content= '.js_list-container-letter_content',
	$listSummary 		= '.js_list-container-summary',
	$listLanguages 	= '.js_list-container-languages',
	$listActivities 		= '.js_list-container-activities',
	$listAwards 		= '.js_list-container-awards',
	$listReferences 	= '.js_list-container-references',
	$listProjects 		= '.js_list-container-projects',
	$listAdditional		= '.js_list-container-additional',
	$listEducation 		= '.js_list-container-education',
	$listExperience 	= '.js_list-container-experience',
	$listSkill 			= '.js_list-container-skills',
	$listInterests 		= '.js_list-container-interests',
	$toolbar 			= '.options_toolbar',
	$btnAddField 		= '.js_add-field',
	$btnAddSections	= '.js_add-sections',
	$btnDeleteElement= '.bt-delete';
var el_summary,el_interests, el_skills, el_education, el_experience,el_languages,el_activities,el_awards,el_references,el_projects,el_additional;
var first_load = true;
var height1pagePDF = 1122;
var Loaded = false;
$(document).ready(function() {
	var timeoutId1;
	var timeoutId2;
	var timeoutId3;
	$('#cv-layout-viewer').show('clip',2000);
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	/*======= sort element editor cv *=======*/
	sort_EditorCV(".sortable-main",      "div", "pos");
	sort_EditorCV(".sortable-sidebar",   "div", "pos");
	sort_EditorCV(".sortable-edu",       $item, "pos");
	sort_EditorCV(".sortable-exp",       $item, "pos");
	sort_EditorCV(".sortable-skills",    $item, "pos");
	sort_EditorCV(".sortable-interests", $item, "pos");
	sort_EditorCV(".sortable-languages", $item, "pos");
	sort_EditorCV(".sortable-activities",$item, "pos");
	sort_EditorCV(".sortable-awards",    $item, "pos");
	sort_EditorCV(".sortable-references",$item, "pos");
	sort_EditorCV(".sortable-projects",  $item, "pos");
	sort_EditorCV(".sortable-additional",$item, "pos");
	/*======= show button add element *=======*/
	$('.onecv-section').hover(
		function(){
			$(this).css('border','2px solid #adb1b5');
			$(this).find($btnAddField).css('display','block');
			$(this).parent().find($toolbar).css('display','block');
		},
		function(){
			$(this).css('border','2px solid rgba(255, 255, 255, 0)');
			$(this).find($btnAddField).css('display','none');
			$(this).parent().find($toolbar).css('display','none');
		}
	);
	$($toolbar).hover(
		function(){
			$(this).parents(".onecv-block").find("section").css('border','2px solid #adb1b5');
			$(this).parents(".onecv-block").find($btnAddField).css('display','block');
			$(this).css('display','block');
		},
		function(){
			$(this).parents(".onecv-block").find("section").css('border','2px solid rgba(255, 255, 255, 0)');
			$(this).parents(".onecv-block").find($btnAddField).css('display','none');
			$(this).css('display','none');
		}
	);
	/*======= define toolbar editor *=======*/
	$('.editor-full').jqte();
	$('.editor-mini').jqte({
		"left":false,
		"ol":false,
		"ul":false,
		"right":false,
		"center":false
	});
	$(document).on('click', $btnAddSections, function(){
		addSections();
	});
	/*======= add element cv *=======*/
	$(document).on('click',$btnAddField, function(){
		let section = $(this).parents(".onecv-block").data("section");
		if(section === 'education'){
			let pos          		= $($listEducation + ' ' + $item).length +1;
			let schoolname 	= $($listEducation + ' ' + $item).eq(pos-2).find($schoolname).html();
			let degree       		= $($listEducation + ' ' + $item).eq(pos-2).find($degree).html();
			let description  	= $($listEducation + ' ' + $item).eq(pos-2).find($description).html();
			let monthFromEdu = $($listEducation + ' ' + $item).eq(pos-2).find($monthFromEdu).html();
			let yearFromEdu  	= $($listEducation + ' ' + $item).eq(pos-2).find($yearFromEdu).html();
			let monthToEdu   	= $($listEducation + ' ' + $item).eq(pos-2).find($monthToEdu).html();
			let yearToEdu    	= $($listEducation + ' ' + $item).eq(pos-2).find($yearToEdu).html();
			$($listEducation).append(el_education);
			$($listEducation + ' ' + $item).eq(pos-1).find($schoolname).html(schoolname);
			$($listEducation + ' ' + $item).eq(pos-1).find($degree).html(degree);
			$($listEducation + ' ' + $item).eq(pos-1).find($description).html(description);
			$($listEducation + ' ' + $item).eq(pos-1).find($monthFromEdu).text(monthFromEdu);
			$($listEducation + ' ' + $item).eq(pos-1).find($yearFromEdu).text(yearFromEdu);
			$($listEducation + ' ' + $item).eq(pos-1).find($monthToEdu).text(monthToEdu);
			$($listEducation + ' ' + $item).eq(pos-1).find($yearToEdu).text(yearToEdu);
			$($listEducation + ' ' + $item).eq(pos-1).removeData('pos');
			$($listEducation + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listEducation + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listEducation + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listEducation + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='experience'){
			let pos          = $($listExperience + ' ' + $item).length +1;
			let position     = $($listExperience + ' ' + $item).eq(pos-2).find($position).html();
			let company      = $($listExperience + ' ' + $item).eq(pos-2).find($company).html();
			let experience 	 = $($listExperience + ' ' + $item).eq(pos-2).find($experience).html();
			let monthFromExp = $($listExperience + ' ' + $item).eq(pos-2).find($monthFromExp).html();
			let yearFromExp  = $($listExperience + ' ' + $item).eq(pos-2).find($yearFromExp).html();
			let monthToExp   = $($listExperience + ' ' + $item).eq(pos-2).find($monthToExp).html();
			let yearToExp    = $($listExperience + ' ' + $item).eq(pos-2).find($yearToExp).html();
			$($listExperience).append(el_experience);
			$($listExperience + ' ' + $item).eq(pos-1).find($position).html(position);
			$($listExperience + ' ' + $item).eq(pos-1).find($company).html(company);
			$($listExperience + ' ' + $item).eq(pos-1).find($experience).html(experience);
			$($listExperience + ' ' + $item).eq(pos-1).find($monthFromExp).text(monthFromExp);
			$($listExperience + ' ' + $item).eq(pos-1).find($yearFromExp).text(yearFromExp);
			$($listExperience + ' ' + $item).eq(pos-1).find($monthToExp).text(monthToExp);
			$($listExperience + ' ' + $item).eq(pos-1).find($yearToExp).text(yearToExp);
			$($listExperience + ' ' + $item).eq(pos-1).removeData('pos');
			$($listExperience + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listExperience + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listExperience + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listExperience + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='interests'){
			let pos      = $($listInterests    + ' ' + $item).length +1;
			let interest = $($listInterests  + ' ' + $item).eq(pos-2).find($interest).html();
			$($listInterests).append(el_interests);
			$($listInterests  + ' ' + $item).eq(pos-1).find($interest).html(interest);
			$($listInterests  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listInterests  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listInterests  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listInterests  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listInterests  + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='skills'){
			let pos        = $($listSkill + ' ' + $item).length +1;
			let skill      = $($listSkill + ' ' + $item).eq(pos-2).find($skill).html();
			$($listSkill).append(el_skills);
			$($listSkill + ' ' + $item).eq(pos-1).find($skill).html(skill);
			$($listSkill + ' ' + $item).eq(pos-1).find($skillLevel).removeData('level');
			$($listSkill + ' ' + $item).eq(pos-1).find($skillLevel).attr('data-level',50);
			if($($skillLevel).hasClass('stylestar')){
				let loop = 50/20;
				for(i=0;i<loop;i++){
					$($listSkill + ' ' + $item).eq(pos-1).find($skillLevel + ' span').eq(i).addClass('checked_rating');
				}
			}
			else if($($skillLevel).hasClass('stylebar')){
				$($listSkill + ' ' + $item).eq(pos-1).find($skillLevel).animate({width: 50+"%"}, 800, 'swing');
			}
			$($listSkill + ' ' + $item).eq(pos-1).removeData('pos');
			$($listSkill + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listSkill + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listSkill + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listSkill + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='languages'){
			let pos 	 = $($listLanguages  + ' ' + $item).length +1;
			let language = $($listLanguages  + ' ' + $item).eq(pos-2).find($language).html();
			let fluency  = $($listLanguages  + ' ' + $item).eq(pos-2).find($fluency).html();
			$($listLanguages).append(el_languages);
			$($listLanguages  + ' ' + $item).eq(pos-1).find($language).html(language);
			$($listLanguages  + ' ' + $item).eq(pos-1).find($fluency).html(fluency);
			$($listLanguages  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listLanguages  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listLanguages  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listLanguages  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listLanguages  + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='activities'){
			let pos      = $($listActivities  + ' ' + $item).length +1;
			let activity = $($listActivities  + ' ' + $item).eq(pos-2).find($activity).html();
			let award    = $($listActivities  + ' ' + $item).eq(pos-2).find($achievement).html();
			$($listActivities).append(el_activities);
			$($listActivities  + ' ' + $item).eq(pos-1).find($activity).html(activity);
			$($listActivities  + ' ' + $item).eq(pos-1).find($achievement).html(award);
			$($listActivities  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listActivities  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listActivities  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listActivities  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listActivities  + ' ' + $item).eq(pos-1).click();
		}
		else  if(section === 'awards'){
			let pos   = $($listAwards  + ' ' + $item).length +1;
			let award = $($listAwards  + ' ' + $item).eq(pos-2).find($award).html();
			$($listAwards).append(el_awards);
			$($listAwards  + ' ' + $item).eq(pos-1).find($award).html(award);
			$($listAwards  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listAwards  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listAwards  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listAwards  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listAwards  + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='references'){
			let pos        = $($listReferences  + ' ' + $item).length +1;
			let name       = $($listReferences  + ' ' + $item).eq(pos-2).find($refer_name).html();
			let phone      = $($listReferences  + ' ' + $item).eq(pos-2).find($refer_phone).html();
			let email      = $($listReferences  + ' ' + $item).eq(pos-2).find($refer_email).html();
			let profession = $($listReferences  + ' ' + $item).eq(pos-2).find($refer_profession).html();
			$($listReferences).append(el_references);
			$($listReferences  + ' ' + $item).eq(pos-1).find($refer_name).html(name);
			$($listReferences  + ' ' + $item).eq(pos-1).find($refer_phone).html(phone);
			$($listReferences  + ' ' + $item).eq(pos-1).find($refer_email).html(email);
			$($listReferences  + ' ' + $item).eq(pos-1).find($refer_profession).html(profession);
			$($listReferences  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listReferences  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listReferences  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listReferences  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listReferences  + ' ' + $item).eq(pos-1).click();
		}
		else  if(section==='projects'){
			let pos 	= $($listProjects  + ' ' + $item).length +1;
			let project = $($listProjects  + ' ' + $item).eq(pos-2).find($project).html();
			$($listProjects).append(el_projects);
			$($listProjects  + ' ' + $item).eq(pos-1).find($project).html(project);
			$($listProjects  + ' ' + $item).eq(pos-1).removeData('pos');
			$($listProjects  + ' ' + $item).eq(pos-1).removeData('uniqid');
			$($listProjects  + ' ' + $item).eq(pos-1).attr('data-pos',pos);
			$($listProjects  + ' ' + $item).eq(pos-1).attr('data-uniqid',guid());
			$($listProjects  + ' ' + $item).eq(pos-1).click();
		}

	});
	/*======= show modal editor *=======*/
	$(document).on('click', $item ,function(e){
		e.preventDefault();
		let pos 			= $(this).data('pos');
		let uniqid          = $(this).data('uniqid');
		let bl_delete       = 0;
		let fieldNull       = [];
		let section = $(this).parents(".onecv-block").data("section");

		if(section==='education'){
			let schoolname 	= $(this).find($schoolname).html();
			let description  	= $(this).find($description).html();
			let degree         	= $(this).find($degree).html();
			let month_from = $(this).find($monthFromEdu).text();
			let year_from   	= $(this).find($yearFromEdu).text();
			let month_to    	= $(this).find($monthToEdu).text();
			let year_to       	= $(this).find($yearToEdu).text();
			if(!$(this).find($schoolname).length){
				fieldNull.push('schoolname');
			}
			if(!$(this).find($description).length){
				fieldNull.push('description');
			}
			if(!$(this).find($degree).length){
				fieldNull.push('degree');
			}
			var object = {'schoolname':schoolname,'degree':degree,'description':description,'month_from':month_from,'year_from':year_from,'month_to':month_to,'year_to':year_to};

			if($($listEducation + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('EducationModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='experience'){
			let position 		= $(this).find($position).html();
			let company  		= $(this).find($company).html();
			let experience 		= $(this).find($experience).html();
			let month_from 		= $(this).find($monthFromExp).text();
			let year_from   	= $(this).find($yearFromExp).text();
			let month_to    	= $(this).find($monthToExp).text();
			let year_to       	= $(this).find($yearToExp).text();
			var object = {'position':position,'company':company,'experience':experience,'month_from':month_from,'year_from':year_from,'month_to':month_to,'year_to':year_to};
			if(!$(this).find($position).length){
				fieldNull.push('positionExp');
			}
			if(!$(this).find($company).length){
				fieldNull.push('companyExp');
			}
			if(!$(this).find($experience).length){
				fieldNull.push('experienceExp');
			}
			if($($listExperience + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('ExperienceModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='interests'){
			let interest 		= $(this).find($interest).html();
			var object = {'interest':interest};
			if($($listInterests + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('InterestsModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='skills'){
			let skill 			= $(this).find($skill).html();
			let rating 			= $(this).find($skillLevel).data('level');
			if(!$(this).find($skillLevel).length){
				fieldNull.push('level');
			}
			var object = {'skill':skill,'rating':rating};
			if($($listSkill + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('SkillsModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='personal_info'){
			let uniqid          = $($block_personal).data('uniqid');
			let name 			= $($name).text();
			let profession 		= $($profession).text();
			let address 		= $($address).html();
			let phone 			= $($phone).text();
			let email 			= $($email).text();
			let website 		= $($website).text();
			let placeofbirth 	= $($placeofbirth).text();
			let dateofbirth 	= $($dateofbirth).text();
			let linkedin 		= $($linkedin).text();
			let facebook 		= $($facebook).text();
			let marital 		= $($marital).text();
			let citizenship 	= $($citizenship).text();
			if(!$($name).length){
				fieldNull.push('name');
			}
			if(!$($profession).length){
				fieldNull.push('profession');
			}
			if(!$($address).length){
				fieldNull.push('address');
			}
			if(!$($phone).length){
				fieldNull.push('phone');
			}
			if(!$($email).length){
				fieldNull.push('email');
			}
			if(!$($website).length){
				fieldNull.push('website');
			}
			if(!$($placeofbirth).length){
				fieldNull.push('placeofbirth');
			}
			if(!$($dateofbirth).length){
				fieldNull.push('dateofbirth');
			}
			if(!$($linkedin).length){
				fieldNull.push('linkedin');
			}
			if(!$($facebook).length){
				fieldNull.push('facebook');
			}
			if(!$($marital).length){
				fieldNull.push('marital');
			}
			if(!$($citizenship).length){
				fieldNull.push('citizenship');
			}
			var object = {'name': name, 'profession':profession, 'address':address, 'phone':phone, 'email':email, 'website':website,'placeofbirth':placeofbirth, 'dateofbirth':dateofbirth, 'linkedin':linkedin, 'facebook':facebook, 'marital':marital, 'citizenship':citizenship};
			parent.OpenModal('ContactModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='summary'){
			let summary 		= $(this).find($summary).html();
			var object 			= {'summary':summary};
			parent.OpenModal('SummaryModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='letter_content'){
			let citydate 		= $(this).find($citydate).html();
			let recipient 		= $(this).find($recipient).html();
			let content 		= $(this).find($content).html();
			var object 			= {'citydate':citydate,'recipient':recipient,'content':content};
			parent.OpenModal('Letter_ContentModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='projects'){
			let project 		= $(this).find($project).html();
			var object 			= {'project':project};
			if($($listProjects + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('ProjectsModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='awards'){
			let award  = $(this).find($award).html();
			var object = {'award':award};
			if($($listAwards + ' ' + $item).length ===1){
				bl_delete =1;
			}
			parent.OpenModal('AwardsModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='languages' ){
			let language 		= $(this).find($language).html();
			let fluency 		= $(this).find($fluency).html();
			if(! $(this).find($fluency).length ){
				fieldNull.push('fluency');
			}
			var object 			= {'language':language,'fluency':fluency};
			if($($listLanguages + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('LanguagesModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='references'){
			let refer_name 	    = $(this).find($refer_name).html();
			let refer_phone     = $(this).find($refer_phone).html();
			let refer_profession= $(this).find($refer_profession).html();
			let refer_email     = $(this).find($refer_email).html();
			var object 			= {'refer_name':refer_name,'refer_phone':refer_phone,'refer_profession':refer_profession,'refer_email':refer_email};
			if($($listReferences + ' ' + $item).length ===1)
			{
				bl_delete =1;
			}
			parent.OpenModal('ReferencesModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='activities'){
			let activity 		= $(this).find($activity).html();
			let achievement     = $(this).find($achievement).html();
			var object 			= {'achievement':achievement,'activity':activity};
			if(!$(this).find($achievement).length){
				fieldNull.push('achievement');
			}
			if($($listActivities + ' ' + $item).length ===1){
				bl_delete =1;
			}
			parent.OpenModal('ActivitiesModal',pos,uniqid,bl_delete,object,fieldNull);
		}
		else  if(section==='additional'){
			let additional 		= $(this).find($additional).html();
			var object 			= {'additional':additional};
			parent.OpenModal('AdditionalModal',pos,uniqid,bl_delete,object,fieldNull);
		}
	});
	//upload images
	$(document).on('click', '#doc_images', function(){
		let src    = getURLimages($images);
		let width  = $(this).width();
		let height = $(this).height();
		var object = {'src':src,'width':width,'height':height};
		parent.OpenModal('CropModal','pos','uniqid','bl_delete',object,[]);
	});
	//delete block
	$(document).on('click', '.js_delete-block', function(){
		parent.hiddenSections($(this).parents(".onecv-block").data("section"));
	});
	//Auto save
	$('#cv-layout-viewer').bind("DOMNodeInserted DOMNodeRemoved",function(){
		clearTimeout(timeoutId1);
		timeoutId1 = setTimeout(function() {
			if(first_load === false){
				parent.getAutoSaveJson();
				parent.AutoSaveData();
			}
			else{
				first_load = false;
			}

		}, ( 500));
		clearTimeout(timeoutId2);
		timeoutId2 = setTimeout(function() {
			$($id_side).css('min-height',height1pagePDF);
			$($id_main).css('min-height',height1pagePDF);
			let heightMax;
			let height   = height1pagePDF;
			let right 	= $($id_side).height() ;
			let left       = $($id_main).height() ;
			left > right ? heightMax = left: heightMax = right;
			a = $('#onecv-main').height();

			heightMax = heightMax + ($('#onecv-main').height() - (heightMax +25));

			while(heightMax > height){
				height=height+height1pagePDF;
			}

			if (typeof $($id_side).html() !== 'undefined'){
				$($id_side).css('min-height',height - $($id_side).css('margin-top').substring(0, $($id_side).css('margin-top').length -2));
			}
			if (typeof $($id_main).html() !== 'undefined'){
				$($id_main).css('min-height',height - $($id_main).css('margin-top').substring(0, $($id_main).css('margin-top').length -2));
			}
			distance = $('#onecv-main').height() - height;
			if (typeof $($id_side).html() !== 'undefined'){
				$($id_side).css('min-height', $($id_side).css('min-height').substring(0, $($id_side).css('min-height').length -2) - distance );
			}
			if (typeof $($id_main).html() !== 'undefined'){
				$($id_main).css('min-height',$($id_main).css('min-height').substring(0, $($id_main).css('min-height').length -2) - distance );
			}
		}, ( 700));
	});
	//Render
	clearTimeout(timeoutId1);
	timeoutId1 = setTimeout(function() {
		var datafromlocalstorage = localStorage.getItem(id_document);
		datafromlocalstorage = JSON.parse(datafromlocalstorage);
		if(1){
			console.log(datafromlocalstorage);
		}
		if (typeof jsonResume !== 'undefined') {
			renderResume();

		}else if (typeof jsonCoverLetter !== 'undefined') {
			renderCoverLetter();
		}
		changeFontFamily(edit_page['font']);
		changeFontSize((edit_page['fontsize']-5)/2);
		changeLineSpacing((edit_page['linespacing']-5)/2);
	}, ( 1000));
	clearTimeout(timeoutId3);
	timeoutId3 = setTimeout(function() {
		Loaded = true;
	}, ( 2000));
});
function addSections(){
	var object = [];
	$("#cv-layout-viewer div.onecv-block" ).each(function(i,el){
		if($(el).data("section") !== 'personal_info')
		{
			object.push($(el).data("section"));
		}
	});
	parent.OpenModal('AddSectionsModal','','','',object,[]);
}
function hex2rgb(hex) {
	return 'rgb('+['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0]+')';
}
function saveAll(id_document,edit_page,name,check) {
	css = "";
	if(typeof $("#fontstyle").attr('href') !== 'undefined' )
		css = "<link type='text/css' rel='stylesheet' href='http://"+$("#fontstyle").attr('href').replace(/(^\w+:|^)\/\//, '')+"'>";

	if(Loaded){
		var json;
		var url = ajaxURL+"saveAll";
		if (typeof jsonResume !== 'undefined') {
			json = create_JsonCV(id_document);
		}else if (typeof jsonCoverLetter !== 'undefined') {
			json = create_JsonCL(id_document);
		}
		$.ajax({
			method: "post",
			url: url,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				'id': id_document,
				'json' : json,
				'edit_page':edit_page,
				'html': css + '\f'+$("#cv-layout-viewer").html(),
				'name':name,
				'check':check
			}),
			beforeSend: function(){
				if(check === 'true'){
					parent.loadingtask(true);
				}
			},
			complete: function(){
				let timeoutId;
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function() {
					if(check === 'true'){
						parent.loadingtask(false);
					}
				}, ( 2000));
			},
			success:function(data){
				parent.createAlert('','',Lang.get('label.Alert.Save.success'),'info',false,true,'pageMessages');
				localStorage.removeItem(name);
			},
			error: function (error) {
				parent.createAlert('','',Lang.get('label.Alert.Save.fail'),'warning',false,true,'pageMessages');
			}
		});
	}
}
function AutoSaveJson(id_document,edit_page) {
	var json;
	/*var url;*/
	var name = id_document;
	if (typeof jsonResume !== 'undefined') {
		json = create_JsonCV(id_document);
		/*url = root+"/my-resume/UpdateJson";*/
	}else if (typeof jsonCoverLetter !== 'undefined') {
		json = create_JsonCL(id_document);
		/*url = root+"/my-cover-letter/UpdateJson";*/
	}
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem(name, json);
	} else {
		console.log('Không hỗ trợ local storage');
	}
}
function guid() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
}
function renderCoverLetter(){
	jsonCoverLetter['letter_content'].forEach(function(currentValue, index, arr) {
		$($listLetter_Content + ' ' + $item).eq(index).find($citydate).html(currentValue['city_date']);
		$($listLetter_Content + ' ' + $item).eq(index).find($recipient).html(currentValue['recipient']);
		$($listLetter_Content + ' ' + $item).eq(index).find($content).html(currentValue['content']);
		$($listLetter_Content + ' ' + $item).eq(index).removeData('pos');
		$($listLetter_Content + ' ' + $item).eq(index).removeData('uniqid');
		$($listLetter_Content + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
		if(currentValue['uniqid'] === ""){
			$($listLetter_Content + ' ' + $item).eq(index).attr('data-uniqid',guid());
		}else{
			$($listLetter_Content + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
		}
	});
	if(jsonCoverLetter['personal_info']['uniqid'] === ""){
		$($block_personal).attr('data-uniqid',guid());
	}else{
		$($block_personal).attr('data-uniqid',jsonCoverLetter['personal_info']['uniqid']);
	}
	var object = {  'images':jsonCoverLetter['personal_info']['images'],
		'name':jsonCoverLetter['personal_info']['name'],
		'profession':jsonCoverLetter['personal_info']['profession'],
		'address':jsonCoverLetter['personal_info']['address'],
		'phone':jsonCoverLetter['personal_info']['phone'],
		'email':jsonCoverLetter['personal_info']['email'],
		'website':jsonCoverLetter['personal_info']['website'],
		'placeofbirth':jsonCoverLetter['personal_info']['placeofbirth'],
		'dateofbirth':jsonCoverLetter['personal_info']['dateofbirth'],
		'linkedin':jsonCoverLetter['personal_info']['linkedin'],
		'facebook':jsonCoverLetter['personal_info']['facebook'],
		'marital':jsonCoverLetter['personal_info']['marital'],
		'citizenship':jsonCoverLetter['personal_info']['citizenship']};
	Object.keys(object).map(function(objectKey, index) {
		var value = object[objectKey];
		if(value === ""){
			$(".doc_"+objectKey).parent().hide();
		}else{
			if(objectKey ==="images")
			{
				if(value === ""){
					value = root+'/avatar.png' ;
				}
				try {
					document.getElementById("doc_" + objectKey).style.backgroundImage = "url("+value+")";
				}
				catch(err) {
					console.log('cv do not images');
				}
			}
			else{
				$(".doc_"+objectKey).text(value);
			}
		}
	});
}
function renderResume(){
	if (jsonResume['my_resume']['sections'].indexOf('summary') !== -1) {
		$($block_summary).removeData('pos');
		$($block_summary).attr('data-pos',positionEL['summary']);
		$($title_summary).text(jsonResume['lang']['Summary']['title']);
		el_summary = $($listSummary).html();
		jsonResume['summary'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['summary'].forEach(function(currentValue, index, arr) {
			$($listSummary + ' ' + $item).eq(index).find($summary).html(currentValue['summary']);
			$($listSummary + ' ' + $item).eq(index).removeData('pos');
			$($listSummary + ' ' + $item).eq(index).removeData('uniqid');
			$($listSummary + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listSummary + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listSummary + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listSummary).append(el_summary);
			}
		});
	}else{
		$($block_summary).remove();
	}
	if (jsonResume['my_resume']['sections'].indexOf('interests') !== -1) {
		$($block_interests).removeData('pos');
		$($block_interests).attr('data-pos',positionEL['interests']);
		$($title_interests).text(jsonResume['lang']['Interests']['title']);
		el_interests = $($listInterests).html();
		jsonResume['interests'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['interests'].forEach(function(currentValue, index, arr) {
			$($listInterests + ' ' + $item).eq(index).find($interest).html(currentValue['interest']);
			$($listInterests + ' ' + $item).eq(index).removeData('pos');
			$($listInterests + ' ' + $item).eq(index).removeData('uniqid');
			$($listInterests + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listInterests + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listInterests + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listInterests).append(el_interests);
			}
		});
	}else{
		$($block_interests).remove();
	}
	if (jsonResume['my_resume']['sections'].indexOf('languages') !== -1) {
		$($block_languages).removeData('pos');
		$($block_languages).attr('data-pos',positionEL['languages']);
		$($title_languages).text(jsonResume['lang']['Languages']['title']);
		el_languages = $($listLanguages).html();
		jsonResume['languages'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['languages'].forEach(function(currentValue, index, arr) {
			$($listLanguages + ' ' + $item).eq(index).find($language).html(currentValue['language']);
			$($listLanguages + ' ' + $item).eq(index).find($fluency).html(currentValue['fluency']);
			$($listLanguages + ' ' + $item).eq(index).removeData('pos');
			$($listLanguages + ' ' + $item).eq(index).removeData('uniqid');
			$($listLanguages + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listLanguages + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listLanguages + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listLanguages).append(el_languages);
			}
		});
	}else{
		$($block_languages).remove();
	}

	if (jsonResume['my_resume']['sections'].indexOf('activities') !== -1) {
		$($block_activities).removeData('pos');
		$($block_activities).attr('data-pos',positionEL['languages']);
		$($title_activities).text(jsonResume['lang']['Activities']['title']);
		el_activities = $($listActivities).html();
		jsonResume['languages'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['activities'].forEach(function(currentValue, index, arr) {
			$($listActivities + ' ' + $item).eq(index).find($activity).html(currentValue['activity']);
			$($listActivities + ' ' + $item).eq(index).find($achievement).html(currentValue['achievement']);
			$($listActivities + ' ' + $item).eq(index).removeData('pos');
			$($listActivities + ' ' + $item).eq(index).removeData('uniqid');
			$($listActivities + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listActivities + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listActivities + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listActivities).append(el_activities);
			}
		});
	}else{
		$($block_activities).remove();
	}

	if (jsonResume['my_resume']['sections'].indexOf('awards') !== -1) {
		$($block_awards).removeData('pos');
		$($block_awards).attr('data-pos',positionEL['awards']);
		$($title_awards).text(jsonResume['lang']['Awards']['title']);
		el_awards = $($listAwards).html();
		jsonResume['awards'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['awards'].forEach(function(currentValue, index, arr) {
			$($listAwards + ' ' + $item).eq(index).find($award).html(currentValue['award']);
			$($listAwards + ' ' + $item).eq(index).removeData('pos');
			$($listAwards + ' ' + $item).eq(index).removeData('uniqid');
			$($listAwards + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listAwards + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listAwards + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listAwards).append(el_awards);
			}
		});
	}else{
		$($block_awards).remove();
	}

	if (jsonResume['my_resume']['sections'].indexOf('references') !== -1) {
		$($block_references).removeData('pos');
		$($block_references).attr('data-pos',positionEL['references']);
		$($title_references).text(jsonResume['lang']['References']['title']);
		el_references = $($listReferences).html();
		jsonResume['references'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['references'].forEach(function(currentValue, index, arr) {
			$($listReferences + ' ' + $item).eq(index).find($refer_profession).html(currentValue['refer_profession']);
			$($listReferences + ' ' + $item).eq(index).find($refer_phone).html(currentValue['refer_phone']);
			$($listReferences + ' ' + $item).eq(index).find($refer_name).html(currentValue['refer_name']);
			$($listReferences + ' ' + $item).eq(index).find($refer_email).html(currentValue['refer_email']);
			$($listReferences + ' ' + $item).eq(index).removeData('pos');
			$($listReferences + ' ' + $item).eq(index).removeData('uniqid');
			$($listReferences + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listReferences + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listReferences + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listReferences).append(el_references);
			}
		});
	}else{
		$($block_references).remove();
	}

	if (jsonResume['my_resume']['sections'].indexOf('projects') !== -1) {
		$($block_projects).removeData('pos');
		$($block_projects).attr('data-pos',positionEL['projects']);
		$($title_projects).text(jsonResume['lang']['Projects']['title']);
		el_projects = $($listProjects).html();
		jsonResume['projects'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['projects'].forEach(function(currentValue, index, arr) {
			$($listProjects + ' ' + $item).eq(index).find($project).html(currentValue['project']);
			$($listProjects + ' ' + $item).eq(index).removeData('pos');
			$($listProjects + ' ' + $item).eq(index).removeData('uniqid');
			$($listProjects + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listProjects + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listProjects + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listProjects).append(el_projects);
			}
		});
	}else{
		$($block_projects).remove();
	}

	if (jsonResume['my_resume']['sections'].indexOf('additional') !== -1) {
		$($block_additional).removeData('pos');
		$($block_additional).attr('data-pos',positionEL['additional']);
		$($title_additional).text(jsonResume['lang']['Additional']['title']);
		el_additional = $($listActivities).html();
		jsonResume['additional'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['additional'].forEach(function(currentValue, index, arr) {
			$($listAdditional + ' ' + $item).eq(index).find($additional).html(currentValue['additional']);
			$($listAdditional + ' ' + $item).eq(index).removeData('pos');
			$($listAdditional + ' ' + $item).eq(index).removeData('uniqid');
			$($listAdditional + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listAdditional + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listAdditional + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listAdditional).append(el_additional);
			}
		});
	}else{
		$($block_additional).remove();
	}
	if (jsonResume['my_resume']['sections'].indexOf('skills') !== -1) {
		$($block_skills).removeData('pos');
		$($block_skills).attr('data-pos',positionEL['skills']);
		$($title_skills).text(jsonResume['lang']['Skills']['title']);
		el_skills = $($listSkill).html();
		jsonResume['skills'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['skills'].forEach(function(currentValue, index, arr) {
			$($listSkill + ' ' + $item).eq(index).find($skill).html(currentValue['skill']);
			$($listSkill + ' ' + $item).eq(index).find($skillLevel).removeData('level');
			$($listSkill + ' ' + $item).eq(index).find($skillLevel).attr('data-level',currentValue['rating']);
			if($($skillLevel).hasClass('stylestar')){
				let loop = currentValue['rating']/20;
				for(i=0;i<loop;i++){
					$($listSkill + ' ' + $item).eq(index).find($skillLevel + ' span').eq(i).addClass('checked_rating');
				}
			}
			else if($($skillLevel).hasClass('stylebar')){
				$($listSkill + ' ' + $item).eq(index).find($skillLevel).animate({width: currentValue['rating']+"%"}, 800, 'swing');
			}
			$($listSkill + ' ' + $item).eq(index).removeData('pos');
			$($listSkill + ' ' + $item).eq(index).removeData('uniqid');
			$($listSkill + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listSkill + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listSkill + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listSkill).append(el_skills);
			}
		});
	}else{
		$($block_skills).remove();
	}
	if (jsonResume['my_resume']['sections'].indexOf('education') !== -1) {
		$($block_education).removeData('pos');
		$($block_education).attr('data-pos',positionEL['education']);
		$($title_education).text(jsonResume['lang']['Education']['title']);
		el_education = $($listEducation).html();
		jsonResume['education'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['education'].forEach(function(currentValue, index, arr) {
			$($listEducation + ' ' + $item).eq(index).find($schoolname).html(currentValue['schoolname']);
			$($listEducation + ' ' + $item).eq(index).find($degree).html(currentValue['degree']);
			$($listEducation + ' ' + $item).eq(index).find($description).html(currentValue['description']);
			$($listEducation + ' ' + $item).eq(index).find($monthFromEdu).text(currentValue['month_from']);
			$($listEducation + ' ' + $item).eq(index).find($yearFromEdu).text(currentValue['year_from']);
			if(currentValue['month_to'] === 'Present' ||currentValue['month_to'] === ''){
				$($listEducation + ' ' + $item).eq(index).find($monthToEdu).hide();
			}
			if(currentValue['month_from'] === ''){
				$($listEducation + ' ' + $item).eq(index).find($monthFromEdu).hide();
			}
			$($listEducation + ' ' + $item).eq(index).find($monthToEdu).text(currentValue['month_to']);
			$($listEducation + ' ' + $item).eq(index).find($yearToEdu).text(currentValue['year_to']);
			$($listEducation + ' ' + $item).eq(index).removeData('pos');
			$($listEducation + ' ' + $item).eq(index).removeData('uniqid');
			$($listEducation + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listEducation + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listEducation + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listEducation).append(el_education);
			}
		});
	}else{
		$($block_education).remove();
	}
	if (jsonResume['my_resume']['sections'].indexOf('experience') !== -1) {
		$($block_experience).removeData('pos');
		$($block_experience).attr('data-pos',positionEL['experience']);
		$($title_experience).text(jsonResume['lang']['Experience']['title']);
		el_experience = $($listExperience).html();
		jsonResume['experience'].sort(function(a, b) {
			return (a['pos']) - (b['pos']);
		});
		jsonResume['experience'].forEach(function(currentValue, index, arr) {
			$($listExperience + ' ' + $item).eq(index).find($position).html(currentValue['position']);
			$($listExperience + ' ' + $item).eq(index).find($company).html(currentValue['company']);
			$($listExperience + ' ' + $item).eq(index).find($experience).html(currentValue['experience']);
			$($listExperience + ' ' + $item).eq(index).find($monthFromExp).text(currentValue['month_from']);
			$($listExperience + ' ' + $item).eq(index).find($yearFromExp).text(currentValue['year_from']);
			if(currentValue['month_to'] === 'Present'){
				$($listExperience + ' ' + $item).eq(index).find($monthToExp).hide();
			}
			$($listExperience + ' ' + $item).eq(index).find($monthToExp).text(currentValue['month_to']);
			$($listExperience + ' ' + $item).eq(index).find($yearToExp).text(currentValue['year_to']);
			$($listExperience + ' ' + $item).eq(index).removeData('pos');
			$($listExperience + ' ' + $item).eq(index).removeData('uniqid');
			$($listExperience + ' ' + $item).eq(index).attr('data-pos',currentValue['pos']);
			if(currentValue['uniqid'] === ""){
				$($listExperience + ' ' + $item).eq(index).attr('data-uniqid',guid());
			}else{
				$($listExperience + ' ' + $item).eq(index).attr('data-uniqid',currentValue['uniqid']);
			}
			if(arr.length >index+1){
				$($listExperience).append(el_experience);
			}
		});
	}else{
		$($block_experience).remove();
	}
	if(jsonResume['personal_info']['uniqid'] === ""){
		$($block_personal).attr('data-uniqid',guid());
	}else{
		$($block_personal).attr('data-uniqid',jsonResume['personal_info']['uniqid']);
	}
	var object = {	'images':jsonResume['personal_info']['images'],
		'name':jsonResume['personal_info']['name'],
		'profession':jsonResume['personal_info']['profession'],
		'address':jsonResume['personal_info']['address'],
		'phone':jsonResume['personal_info']['phone'],
		'email':jsonResume['personal_info']['email'],
		'website':jsonResume['personal_info']['website'],
		'placeofbirth':jsonResume['personal_info']['placeofbirth'],
		'dateofbirth':jsonResume['personal_info']['dateofbirth'],
		'linkedin':jsonResume['personal_info']['linkedin'],
		'facebook':jsonResume['personal_info']['facebook'],
		'marital':jsonResume['personal_info']['marital'],
		'citizenship':jsonResume['personal_info']['citizenship']};
	Object.keys(object).map(function(objectKey, index) {
		var value = object[objectKey];
		if(value === "" && objectKey !== "images"){
			$(".doc_"+objectKey).parent().hide();
		}else{
			if(objectKey ==="images")
			{
				if(value === ""){
					value = root+'/avatar.png' ;
				}
				try {
					document.getElementById("doc_" + objectKey).style.backgroundImage = "url("+value+")";
				}
				catch(err) {
					console.log('cv do not images');
				}
			}
			else{
				$(".doc_"+objectKey).text(value);
			}
		}
	});
	$($btnAddSections).text(jsonResume['lang']['Button']['addSections']);
	$($btnAddField).text(jsonResume['lang']['Button']['addField']);
	sortElement($($id_main).find('div.onecv-block'),$($id_main));
	sortElement($($id_side).find('div.onecv-block'),$('div#group-bottom-side'));
}
function deleteItem(container,pos){
	if($("."+container+' ' + $item).length !==1){
		$("."+container ).each(function(i,el){
			$(el).find("[data-pos='" + pos + "']").remove();
		});
	}
	$("."+container+' ' + $item).each(function(i, el){
		$(el).removeData('pos');
		$(el).attr('data-pos',$(el).index()+1);
	});
}
function saveModal(section,pos,object){
	if(     section  === "summary"){
		$($listSummary + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($summary).html(object['summary']) ;
			}
		});
	}
	else if(section  === "experience"){
		$($listExperience + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($monthToExp).show();
				$(el).find($monthFromExp).show();
				$(el).find($position).html(object['position']) ;
				$(el).find($company).html(object['company']) ;
				$(el).find($experience).html(object['experience']) ;
				$(el).find($monthFromExp).text(object['month_from']) ;
				$(el).find($yearFromExp).text(object['year_from']) ;
				if(object['month_from'] === ''){
					$(el).find($monthToExp).hide();
				}
				if(object['month_to'] === 'Present' || object['month_to'] === ''){
					$(el).find($monthToExp).hide();
				}
				$(el).find($monthToExp).text(object['month_to']) ;
				$(el).find($yearToExp).text(object['year_to']) ;
			}
		});
	}
	else if(section  === "education"){
		$($listEducation + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($monthToEdu).show();
				$(el).find($monthFromEdu).show();
				$(el).find($schoolname).html(object['schoolname']) ;
				$(el).find($degree).html(object['degree']) ;
				$(el).find($description).html(object['description']) ;
				$(el).find($monthFromEdu).text(object['month_from']) ;
				$(el).find($yearFromEdu).text(object['year_from']) ;
				if(object['month_from'] === ''){
					$(el).find($monthFromEdu).hide();
				}
				if(object['month_to'] === 'Present' || object['month_to'] === ''){
					$(el).find($monthToEdu).hide();
				}
				$(el).find($monthToEdu).text(object['month_to']);
				$(el).find($yearToEdu).text(object['year_to']) ;
			}
		});
	}
	else if(section  === "skills"){
		$($listSkill + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($skill).html(object['skill']) ;
				$(el).find($skillLevel).removeData('level');
				$(el).find($skillLevel).attr("data-level",object['rating']) ;

				if($($skillLevel).hasClass('stylestar')){
					let loop = object['rating']/20;
					for(i=0;i<5;i++){
						$(el).find($skillLevel + ' span').eq(i).removeClass('checked_rating');
					}
					for(i=0;i<loop;i++){
						$(el).find($skillLevel + ' span').eq(i).addClass('checked_rating');
					}
				}
				else if($($skillLevel).hasClass('stylebar')){
					$(el).find($skillLevel).animate({width: object['rating']+"%"}, 800, 'swing');
				}
			}
		});
	}
	else if(section  === "interests"){
		$($listInterests + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($interest).html(object['interest']) ;
			}
		});
	}
	else if(section  === "projects"){
		$($listProjects + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($project).html(object['project']) ;
			}
		});
	}
	else if(section  === "awards"){
		$($listAwards + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($award).html(object['award']) ;
			}
		});
	}
	else if(section  === "languages"){
		$($listLanguages + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($language).html(object['language']) ;
				$(el).find($fluency).html(object['fluency']) ;
			}
		});
	}
	else if(section  === "references"){
		$($listReferences + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($refer_name).html(object['refer_name']);
				$(el).find($refer_phone).html(object['refer_phone']);
				$(el).find($refer_email).html(object['refer_email']);
				$(el).find($refer_profession).html(object['refer_profession']) ;
			}
		});
	}
	else if(section  === "activities"){
		$($listActivities + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($activity).html(object['activity']) ;
				$(el).find($achievement).html(object['achievement']) ;
			}
		});
	}
	else if(section  === "additional"){
		$($listAdditional + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($additional).html(object['additional']) ;
			}
		});
	}
	else if(section  === "letter_content"){
		$($listLetter_Content + ' ' + $item).each(function(i,el){
			if($(el).data('pos')===pos){
				$(el).find($citydate).html(object['citydate']);
				$(el).find($recipient).html(object['recipient']);
				$(el).find($content).html(object['content']);
			}
		});
	}
	else if(section  === "contact"){
		Object.keys(object).map(function(objectKey, index) {
			var value = object[objectKey];
			if(value === ""){
				$(".doc_"+objectKey).parent().hide();
			}else{
				$(".doc_"+objectKey).parent().show();
			}
		});
		$($name).html(object['name']);
		$($profession).html(object['profession']);
		$($address).html(object['address']);
		$($email).text(object['email']);
		$($phone).text(object['phone']);
		$($website).text(object['website']);
		$($placeofbirth).text(object['placeofbirth']);
		$($dateofbirth).text(object['dateofbirth']);
		$($linkedin).text(object['linkedin']);
		$($facebook).text(object['facebook']);
		$($marital).text(object['marital']);
		$($citizenship).text(object['citizenship']);
		$(this).parents(".onv_modal").fadeOut("slow");
	}
	else if(section  === "crop"){
		parent.AutoSaveData();
		document.getElementById($images).style.backgroundImage = "url("+object['src']+")";
	}
}
function sort_EditorCV(target, select, attr){
	var handle = "";
	if(target === '.sortable-main' || target === '.sortable-sidebar'){
		handle = '.js_sortable-handle'
	}
	$(function() {
		$( target ).sortable({
			placeholder: "portlet-placeholder ui-corner-all",
			handle: handle,
		}).disableSelection();
		$( target ).sortable({
			scroll: true, scrollSensitivity: 100, scrollSpeed: 10,
			connectWith: target,
			start: function(e,ui){
				ui.placeholder.height(ui.item.height());
			},
			stop: function(event, ui){
				$(target+" "+select).each(function(i, el){
					$(el).removeData(attr);
					$(el).attr('data-'+attr,$(el).index()+1);
				});
			}
		});
	});
}
function sortElement(cont,contacts){
	cont.detach().sort(function(a, b) {
		var astts = $(a).data('pos');
		var bstts = $(b).data('pos')
		//return astts - bstts;
		return (astts > bstts) ? (astts > bstts) ? 1 : 0 : -1;
	});
	contacts.append(cont);
}
function create_JsonCV(id_document){
	jsonObjInterests = [];
	$($listInterests + ' ' + $item).each(function() {
		item = {}
		item ["uniqid"]            	= $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["interest"] 	= $(this).find($interest).html();
		jsonObjInterests.push(item);
	});
	jsonObjExperience = [];
	$($listExperience + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]         	= $(this).data('uniqid');
		item ["pos"]            	= $(this).data('pos');
		item ["position"]       	= (typeof $(this).find($position).html()        === 'undefined') ? '': $(this).find($position).html();
		item ["company"]       	= (typeof $(this).find($company).html()     === 'undefined') ? '': $(this).find($company).html();
		item ["experience"]    	= (typeof $(this).find($experience).html()  === 'undefined') ? '': $(this).find($experience).html();
		item ["year_from"]     	= $(this).find($yearFromExp).text();
		item ["month_from"]  	= $(this).find($monthFromExp).text();
		item ["year_to"]        	= $(this).find($yearToExp).text();
		item ["month_to"]      	= $(this).find($monthToExp).text();
		jsonObjExperience.push(item);
	});
	jsonObjSummary = [];
	$($listSummary + ' ' + $item).each(function() {
		item = {}
		item ["uniqid"]         = $(this).data('uniqid');
		item ["pos"]             = $(this).data('pos');
		item ["summary"]   = $($summary).html();
		jsonObjSummary.push(item);
	});

	jsonObjEducation = [];
	$($listEducation + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]         = $(this).data('uniqid');
		item ["pos"]            = $(this).data('pos');
		item ["schoolname"] 	= (typeof $(this).find($schoolname).html()   === 'undefined') ? '': $(this).find($schoolname).html() ;
		item ["degree"]         = (typeof $(this).find($degree).html()       === 'undefined') ? '': $(this).find($degree).html() ;
		item ["description"]    = (typeof $(this).find($description).html()  === 'undefined') ? '': $(this).find($description).html() ;
		item ["year_from"]     	= $(this).find($yearFromEdu).text();
		item ["month_from"]  	= $(this).find($monthFromEdu).text();
		item ["year_to"]        = $(this).find($yearToEdu).text();
		item ["month_to"]       = $(this).find($monthToEdu).text();
		jsonObjEducation.push(item);
	});

	jsonObjSkills = [];
	$($listSkill + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            	= $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["skill"]          	= $(this).find($skill).html();
		item ["rating"]     	= (typeof $(this).find($skillLevel).data("level") === 'undefined') ? '':$(this).find($skillLevel).data("level") ;
		jsonObjSkills.push(item);
	});

	jsonObjLanguages = [];
	$($listLanguages + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            	= $(this).data('uniqid') ;
		item ["pos"]               	= $(this).data('pos');
		item ["language"]          	= $(this).find($language).html();
		item ["fluency"]     	= (typeof $(this).find($fluency).html()  === 'undefined') ? '': $(this).find($fluency).html() ;
		jsonObjLanguages.push(item);
	});

	jsonObjActivities = [];
	$($listActivities + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            	= $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["activity"]          	= $(this).find($activity).html();
		item ["achievement"]        = (typeof $(this).find($achievement).html()  === 'undefined') ? '': $(this).find($achievement).html() ;
		jsonObjActivities.push(item);
	});

	jsonObjReferences = [];
	$($listReferences + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            	= $(this).data('uniqid');
		item ["pos"]               		= $(this).data('pos');
		item ["refer_name"]         	= (typeof $(this).find($refer_name).html()        	=== 'undefined') ? '': $(this).find($refer_name).html() ;
		item ["refer_phone"]        	= (typeof $(this).find($refer_phone).html()       	=== 'undefined') ? '': $(this).find($refer_phone).html() ;
		item ["refer_email"]        	= (typeof $(this).find($refer_email).html()       	=== 'undefined') ? '': $(this).find($refer_email).html() ;
		item ["refer_profession"]   = (typeof $(this).find($refer_profession).html()  	=== 'undefined') ? '': $(this).find($refer_profession).html() ;
		jsonObjReferences.push(item);
	});

	jsonObjProjects = [];
	$($listProjects + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            = $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["project"]          	= $(this).find($project).html();
		jsonObjProjects.push(item);
	});

	jsonObjAdditional = [];
	$($listAdditional + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]            = $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["additional"]     	= $(this).find($additional).html();
		jsonObjAdditional.push(item);
	});

	//Position
	jsonObjPosition = [];
	item = {   }
	item ["summary"]      			= $($block_summary).data("pos");
	item ["education"]      			= $($block_education).data("pos");
	item ["skills"]              		= $($block_skills).data("pos");
	item ["experience"]    			= $($block_experience).data("pos");
	item ["languages"]    			= $($block_languages).data("pos");
	item ["activities"]    			= $($block_activities).data("pos");
	item ["interests"]    			= $($block_interests).data("pos");
	item ["references"]    			= $($block_references).data("pos");
	item ["projects"]    			= $($block_projects).data("pos");
	item ["additional"]    			= $($block_additional).data("pos");

	jsonObjPosition.push(item);
	//Personal_info
	jsonObjPersonal = [];
	item = {}
	item ["uniqid"]            	=  $($block_personal).data('uniqid');
	item ["name"]          		=  ( $($name).text()  		=== '') ? '': $($name).text() ;
	item ["profession"]         =  ( $($profession).text()  === '') ? '': $($profession).text() ;
	item ["address"]          	=  ( $($address).text()  	=== '') ? '': $($address).text() ;
	item ["phone"]          	=  ( $($phone).text()  		=== '') ? '': $($phone).text() ;
	item ["email"]          	=  ( $($email).text()  		=== '') ? '': $($email).text() ;
	item ["placeofbirth"]       =  ( $($placeofbirth).text()=== '') ? '': $($placeofbirth).text() ;
	item ["dateofbirth"]        =  ( $($dateofbirth).text() === '') ? '': $($dateofbirth).text() ;
	item ["website"]          	=  ( $($website).text()  	=== '') ? '': $($website).text() ;
	item ["marital"]          	=  ( $($marital).text()  	=== '') ? '': $($marital).text() ;
	item ["citizenship"]         	=  ( $($citizenship).text()  === '') ? '': $($citizenship).text() ;
	item ["linkedin"]          	=  ( $($linkedin).text()  	=== '') ? '': $($linkedin).text() ;
	item ["facebook"]          	=  ( $($facebook).text()  	=== '') ? '': $($facebook).text() ;
	try {
		item ["images"]          	=  getURLimages($images);
	}
	catch(err) {
		item ["images"]          = jsonResume['personal_info']['images'];
	}

	jsonObjPersonal.push(item);
	var JsonFile = JSON.stringify({
		"skills" :jsonObjSkills,
		"education" :jsonObjEducation,
		"summary" :jsonObjSummary,
		"interests" :jsonObjInterests,
		"experience" :jsonObjExperience,
		"position" :jsonObjPosition,
		"languages" :jsonObjLanguages,
		"activities" :jsonObjActivities,
		"references" :jsonObjReferences,
		"projects" :jsonObjProjects,
		"additional" :jsonObjAdditional,
		"personal_info" :jsonObjPersonal[0]
	},null,4);
	return JsonFile;
}
function create_JsonCL(id_document){
	jsonObjPersonal = [];
	item = {}
	item ["uniqid"]            	=  $($block_personal).data('uniqid');
	item ["name"]          		=  ( $($name).text()  		=== '') ? jsonCoverLetter['personal_info']['name']: $($name).text() ;
	item ["profession"]          	=  ( $($profession).text()  === '') ? jsonCoverLetter['personal_info']['profession']: $($profession).text() ;
	item ["address"]          	=  ( $($address).text()  	=== '') ? jsonCoverLetter['personal_info']['address']: $($address).text() ;
	item ["phone"]          		=  ( $($phone).text()  		=== '') ? jsonCoverLetter['personal_info']['phone']: $($phone).text() ;
	item ["email"]          		=  ( $($email).text()  		=== '') ? jsonCoverLetter['personal_info']['email']: $($email).text() ;
	item ["placeofbirth"]         =  ( $($placeofbirth).text()=== '') ? jsonCoverLetter['personal_info']['placeofbirth']: $($placeofbirth).text() ;
	item ["dateofbirth"]          	=  ( $($dateofbirth).text() === '') ? jsonCoverLetter['personal_info']['dateofbirth']: $($dateofbirth).text() ;
	item ["website"]          	=  ( $($website).text()  	=== '') ? jsonCoverLetter['personal_info']['website']: $($website).text() ;
	item ["marital"]          		=  ( $($marital).text()  	=== '') ? jsonCoverLetter['personal_info']['marital']: $($marital).text() ;
	item ["citizenship"]         	=  ( $($citizenship).text()  === '') ? jsonCoverLetter['personal_info']['citizenship']: $($citizenship).text() ;
	item ["linkedin"]          	=  ( $($linkedin).text()  	=== '') ? jsonCoverLetter['personal_info']['linkedin']: $($linkedin).text() ;
	item ["facebook"]          	=  ( $($facebook).text()  	=== '') ? jsonCoverLetter['personal_info']['facebook']: $($facebook).text() ;
	try {
		item ["images"]          	=  getURLimages($images);
	}
	catch(err) {
		item ["images"]             = "";
	}
	jsonObjPersonal.push(item);
	jsonObjLetter_Content = [];
	$($listLetter_Content + ' ' + $item).each(function(i,a) {
		item = {}
		item ["uniqid"]           	= $(this).data('uniqid');
		item ["pos"]               	= $(this).data('pos');
		item ["city_date"]       	= $(this).find($citydate).html().trim();
		item ["recipient"]       	= $(this).find($recipient).html().trim();
		item ["content"]       	= $(this).find($content).html().trim();
		jsonObjLetter_Content.push(item);
	});
	var JsonFile = JSON.stringify({
		"letter_content" :jsonObjLetter_Content,
		"personal_info" :jsonObjPersonal[0]
	},null,4);
	return JsonFile;
}
function downloadpdf(id_document,name){
	$.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		method: "post",
		url: ajaxURL+'is_checkfilepdf',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			'id': id_document,
			'name':name
		}),
		success:function(data){
			message = JSON.stringify(data.message);
			if(message.indexOf("success") !== -1){
				window.location.href = ajaxURL+"downloadpdf/"+name+"/"+id_document+'?'+Math.floor(Math.random()*(100-1+1)+1);
			}
			else if(message.indexOf("fails") !== -1){
				parent.showerrodown();
			}
		},
		error: function (error) {
		}
	});

}
function getURLimages(id){
	// Get the image id, style and the url from it
	var img = document.getElementById(id),
		style = img.currentStyle || window.getComputedStyle(img, false),
		bi = style.backgroundImage.slice(4, -1);
	// For IE we need to remove quotes to the proper url
	bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
	// Display the url to the user
	return bi;
}
function changeFontSize(size){
	$("#cv-layout-viewer").find('.doc_city_date,.doc_recipient,.doc_content,.doc_degree,.doc_skill,.doc_level,.section-title,.js_add-field,.doc_description,.doc_schoolname,.doc_MonthFromEdu,.doc_YearFromEdu,.doc_MonthToEdu,.doc_YearToEdu,.doc_position,.doc_MonthFromExp,.doc_YearFromExp,.doc_MonthToExp,.doc_YearToExp,.doc_company,.doc_experience,.doc_summary,.doc_interest,.doc_name,.doc_profession,.doc_address,.doc_email,.doc_phone,.doc_website,.doc_placeofbirth,.doc_dateofbirth,.doc_linkedin,.doc_facebook,.doc_marital,.doc_citizenship,.doc_additional,.doc_activity,.doc_fluency,.doc_language,.doc_award,.doc_project,.doc_refer_profession,.doc_refer_phone,.doc_refer_name,.doc_refer_email,.doc_achievement').animate({'font-size': '+='+size});
}
function changeLineSpacing(size){
	$("#cv-layout-viewer").find('.doc_city_date,.doc_recipient,.doc_content,.doc_degree,.doc_skill,.doc_level,.section-title,.js_add-field,.doc_description,.doc_schoolname,.doc_MonthFromEdu,.doc_YearFromEdu,.doc_MonthToEdu,.doc_YearToEdu,.doc_position,.doc_MonthFromExp,.doc_YearFromExp,.doc_MonthToExp,.doc_YearToExp,.doc_company,.doc_experience,.doc_summary,.doc_interest,.doc_name,.doc_profession,.doc_address,.doc_email,.doc_phone,.doc_website,.doc_placeofbirth,.doc_dateofbirth,.doc_linkedin,.doc_facebook,.doc_marital,.doc_citizenship,.doc_additional,.doc_activity,.doc_fluency,.doc_language,.doc_award,.doc_project,.doc_refer_profession,.doc_refer_phone,.doc_refer_name,.doc_refer_email,.doc_achievement').animate({'line-height': '+='+size});
}
function changeFontFamily(font){
	$("#fontstyle").remove();
	if(font !== 'default'){
		url = root + '/assets/'+font+'.css';
		$('head').append('<link id="fontstyle" rel="stylesheet" href="'+url + '" type="text/css" />');
	}
}
function changeColor(mainColor,fontColor, sideColor){
	$('.setMainColor').css('background-color', mainColor);
	$('.level-bar-inner').css({'background-color': sideColor});
	$('.setTitleColor').css('color', sideColor);
	$('.setFontColor').css('color', fontColor);
	sideColor = sideColor.substring(4, sideColor.length-1)
		.replace(/ /g, '')
		.split(',');
	mainColor = mainColor.substring(4, mainColor.length-1)
		.replace(/ /g, '')
		.split(',');
	fontColor = fontColor.substring(4, fontColor.length-1)
		.replace(/ /g, '')
		.split(',');
	$('.setPressColor').css({'background-color': 'rgba('+sideColor+', 0.8)'});
}