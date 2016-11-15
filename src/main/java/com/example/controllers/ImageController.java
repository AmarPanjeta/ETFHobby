package com.example.controllers;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.models.ProfileImage;

@RestController
public class ImageController {
	@Autowired
	ImageUploadService imageUploadService;
	
	@RequestMapping(value="/download",method=RequestMethod.GET)
	public ResponseEntity downloadImage(@RequestParam("name") String name){
		
		ProfileImage image=imageUploadService.findByName(name);
		
		if(image==null){
			return new ResponseEntity<>("{}",HttpStatus.NOT_FOUND);
		}
		
		HttpHeaders headers = new HttpHeaders();
		
		headers.add("content-disposition", "attachment; filename=" + image.getName());
		
		String primaryType,subType;
		try {
            primaryType = image.getMimeType().split("/")[0];
            subType = image.getMimeType().split("/")[1];
        }
            catch (IndexOutOfBoundsException | NullPointerException ex) {
            return new ResponseEntity<>("{}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
		

        headers.setContentType( new MediaType(primaryType, subType) );

        return new ResponseEntity<>(image.getImage(), headers, HttpStatus.OK);
	}
	
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	public ResponseEntity uploadImage(MultipartHttpServletRequest request){
        try {
            Iterator<String> itr = request.getFileNames();

            while (itr.hasNext()) {
                String uploadedFile = itr.next();
                MultipartFile file = request.getFile(uploadedFile);
                String mimeType = file.getContentType();
                String filename = file.getOriginalFilename();
                byte[] bytes = file.getBytes();

                ProfileImage newFile = new ProfileImage(filename, bytes, mimeType);

                imageUploadService.uploadImage(newFile);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>("{}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("{}", HttpStatus.OK);
	}
}
