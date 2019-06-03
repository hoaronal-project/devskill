package com.devskill.web.admin;

import com.devskill.common.utils.CoreResponse;
import com.devskill.domain.DataSet;
import com.devskill.model.CustomerForm;
import com.devskill.model.PostCreateForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class AjaxController {
	private static Logger logger = LoggerFactory.getLogger(AjaxController.class);

	private Map<String, CustomerForm> customers = null;

	public AjaxController(){
		customers = new HashMap<String, CustomerForm>();
	}

	@Autowired
	private MessageSource messageSource;

	// Test Case - 1
	@ResponseBody
	@RequestMapping(value="/list", method=RequestMethod.GET, consumes=MediaType.APPLICATION_JSON_VALUE)
	public List<String> list(@ModelAttribute("username") String username, @RequestParam("password") String password){
		logger.info("Request List....");
		logger.info("username : "+username);
		logger.info("password : "+password);
		List<String> response = new ArrayList<String>();
		response.add(username);
		response.add(password);
		return response;
	}

	// Test Case - 2
	@ResponseBody
	@RequestMapping(value="/list_model", method=RequestMethod.GET, consumes=MediaType.APPLICATION_JSON_VALUE)
	public List<String> list_model(@ModelAttribute("dataSet") DataSet dataSet){
		logger.info("Request List_Model.... - {}", dataSet);
		List<String> response = new ArrayList<String>();
		response.add(dataSet.getUsername());
		response.add(dataSet.getPassword());
		return response;
	}
	
	// Test Case - 3
	@RequestMapping(value="/list_nobody", method=RequestMethod.GET, consumes=MediaType.APPLICATION_JSON_VALUE)
	public List<String> list_noresponsebody(@ModelAttribute("username") String username, @RequestParam("password") String password){
		logger.info("Request List....");
		logger.info("username : "+username);
		logger.info("password : "+password);
		List<String> response = new ArrayList<String>();
		response.add(username);
		response.add(password);
		return response;
	}
	
	// Test Case - 4
	@ResponseBody
	@RequestMapping(value="/map", method=RequestMethod.PUT, produces=MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> map(@RequestBody DataSet dataSet){
		logger.info("Request Map.... - {}", dataSet);
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("username", dataSet.getUsername());
		response.put("password", dataSet.getPassword());
		return response;
	}
	
	// Test Case - 5
	@ResponseBody
	@RequestMapping(value="/map_get", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> map_get(@RequestBody DataSet dataSet){
		logger.info("Request Map_Get.... - {}", dataSet);
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("username", dataSet.getUsername());
		response.put("password", dataSet.getPassword());
		return response;
	}
	
	// Test Case - 6
	@ResponseBody
	@RequestMapping(value="/entity", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> entity(@RequestBody DataSet dataSet){
		logger.info("Request Entity.... - {}", dataSet);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("username", dataSet.getUsername());
		map.put("password", dataSet.getPassword());
		
		ResponseEntity<Object> response = new ResponseEntity<Object>(map, HttpStatus.OK);
		return response;
	}
	
	//@ResponseBody
	@RequestMapping(value="/entity_nobody", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> entity_nobody(@RequestBody DataSet dataSet){
		logger.info("Request Entity Nobody.... - {}", dataSet);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("username", dataSet.getUsername());
		map.put("password", dataSet.getPassword());
		
		ResponseEntity<Object> response = new ResponseEntity<Object>(map, HttpStatus.OK);
		return response;
	}
	
	// Test Case - 8
	@RequestMapping(value="/entity_nobody_param", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> entity_nobody_param(@RequestBody DataSet dataSet, @RequestParam String param){
		logger.info("Request Entity Nobody.... - {}", dataSet);
		logger.info("param {}",param);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("username", dataSet.getUsername());
		map.put("password", dataSet.getPassword());
		
		ResponseEntity<Object> response = new ResponseEntity<Object>(map, HttpStatus.OK);
		return response;
	}

	// Test Case - 6
	@ResponseBody
	@RequestMapping(value="/entity/create", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> entitycreate(@RequestBody PostCreateForm postJson){
		logger.info("Request Entity.... - {}", postJson);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("username", postJson.getTitle());
		map.put("password", postJson.getBody());

		ResponseEntity<Object> response = new ResponseEntity<Object>(map, HttpStatus.OK);
		return response;
	}



	@ResponseBody
	@RequestMapping(value = "/cust/save", method = RequestMethod.POST)
	public ResponseEntity<CoreResponse>  saveCustomerAction(
			@RequestBody @Valid CustomerForm customerJson,
			BindingResult bindingResult, Model model) {
		CoreResponse response = new CoreResponse();
		/*if (bindingResult.hasErrors()) {
			for (Object object : bindingResult.getAllErrors()) {
				if(object instanceof FieldError) {
					FieldError fieldError = (FieldError) object;
					System.out.println(fieldError.getDefaultMessage());
					System.out.println(fieldError.getCode());
				}

				if(object instanceof ObjectError) {
					ObjectError objectError = (ObjectError) object;

					System.out.println(objectError.getCode());
				}

				FieldError fieldError = (FieldError) object;
				String message = messageSource.getMessage(fieldError, null);
			}

			ResponseEntity<Object> response = new ResponseEntity<Object>(customerJson, HttpStatus.OK);
			return response;
		}*/

		if(bindingResult.hasErrors()){
			Map<String, String> errors = bindingResult.getFieldErrors().stream()
					.collect(
							Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage)
					);

			response.setSuccess(false);
			response.setErrorMessages(errors);
			response.setParamObject(customerJson);
		}else{
			response.setSuccess(true);
			response.setParamObject(customerJson);
		}
		return new ResponseEntity<CoreResponse>(response, HttpStatus.OK);
	}
}
