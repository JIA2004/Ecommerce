package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.Vehiculo;
import com.uade.tpo.demo.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    
    @Autowired
    private VehicleService vehicleService;

    // Crea un vehículo (con o sin imagen)
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Vehiculo> createVehicle(
            @RequestPart("vehicle") Vehiculo vehicle,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (image != null && !image.isEmpty()) {
                vehicle.setImagen(image.getBytes());
            }
            Vehiculo savedVehicle = vehicleService.saveVehicle(vehicle);
            return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<Vehiculo> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Obtener la imagen de un vehículo
    @GetMapping("/{id}/image")
    public ResponseEntity<String> getVehicleImage(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .filter(v -> v.getImagen() != null)
                .map(v -> ResponseEntity.ok(Base64.getEncoder().encodeToString(v.getImagen())))
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar la imagen de un vehículo
    @PutMapping("/{id}/image")
    public ResponseEntity<Vehiculo> updateVehicleImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image) {
        return vehicleService.getVehicleById(id).map(vehicle -> {
            try {
                vehicle.setImagen(image.getBytes());
                Vehiculo updatedVehicle = vehicleService.saveVehicle(vehicle);
                return ResponseEntity.ok(updatedVehicle);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> updateVehicle(@PathVariable Long id, @RequestBody Vehiculo vehicleDetails) {
        return vehicleService.getVehicleById(id).map(vehicle -> {
            vehicle.setMarca(vehicleDetails.getMarca());
            vehicle.setModelo(vehicleDetails.getModelo());
            // ... (copia aquí el resto de los setters como los tenías)
            vehicle.setCategory(vehicleDetails.getCategory());
            
            Vehiculo updatedVehicle = vehicleService.saveVehicle(vehicle);
            return ResponseEntity.ok(updatedVehicle);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (vehicleService.getVehicleById(id).isPresent()) {
            vehicleService.deleteVehicle(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}