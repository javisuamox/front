/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hackaton.problema8.service;

import com.hackaton.problema8.model.Bike;
import com.hackaton.problema8.repository.RepositorioBike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author user
 */
@Service
public class ServiciosBike {
     @Autowired
    private RepositorioBike metodosCrud;

    public List<Bike> getAll(){
        return metodosCrud.getAll();
    }

    public Optional<Bike> getBike(int bikeId) {
        return metodosCrud.getBike(bikeId);
    }

    public Bike save(Bike bike){
        if(bike.getId()==null){
            return metodosCrud.save(bike);
        }else{
            Optional<Bike> e=metodosCrud.getBike(bike.getId());
            if(e.isEmpty()){
                return metodosCrud.save(bike);
            }else{
                return bike;
            }
        }
    }

    public Bike update(Bike bike){
        if(bike.getId()!=null){
            Optional<Bike> e=metodosCrud.getBike(bike.getId());
            if(!e.isEmpty()){
                if(bike.getBrand()!=null){
                    e.get().setBrand(bike.getBrand());
                }
                if(bike.getYear()!=null){
                    e.get().setYear(bike.getYear());
                }
                if(bike.getDescription()!=null){
                    e.get().setDescription(bike.getDescription());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return bike;
            }
        }else{
            return bike;
        }
    }


    public boolean deleteBike(int bikeId) {
        Boolean aBoolean = getBike(bikeId).map(bike -> {
            metodosCrud.delete(bike);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
