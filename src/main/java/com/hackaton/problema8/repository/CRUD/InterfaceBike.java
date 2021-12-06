/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.hackaton.problema8.repository.CRUD;

import org.springframework.data.repository.CrudRepository;
import com.hackaton.problema8.model.Bike;

/**
 *
 * @author user
 */
public interface InterfaceBike extends CrudRepository<Bike,Integer> {
    
}
