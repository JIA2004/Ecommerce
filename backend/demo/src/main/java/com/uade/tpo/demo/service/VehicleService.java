package com.uade.tpo.demo.service;

import com.uade.tpo.demo.categories.Category;
import com.uade.tpo.demo.categories.CategoryRepository;
import com.uade.tpo.demo.entity.Vehiculo;
import com.uade.tpo.demo.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CategoryRepository categoryRepository;

    public VehicleService(VehicleRepository vehicleRepository, CategoryRepository categoryRepository) {
        this.vehicleRepository = vehicleRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Vehiculo> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehiculo> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehiculo saveVehicle(Vehiculo vehicle) {
        if (vehicle.getCategory() != null && vehicle.getCategory().getId() != null) {
            Category category = categoryRepository.findById(vehicle.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id " + vehicle.getCategory().getId()));
            vehicle.setCategory(category);
        }
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
