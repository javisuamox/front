/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hackaton.problema8.repository.CRUD;

import org.springframework.data.repository.CrudRepository;
import com.hackaton.problema8.model.Mensaje;
/**
 *
 * @author user
 */
public interface InterfaceMensaje extends CrudRepository<Mensaje,Integer> {
    
}
