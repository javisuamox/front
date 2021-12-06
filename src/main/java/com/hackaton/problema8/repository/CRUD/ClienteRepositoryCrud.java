/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.hackaton.problema8.repository.CRUD;

import com.hackaton.problema8.model.Cliente;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Angie Moreno
 */
public interface ClienteRepositoryCrud extends CrudRepository<Cliente, Integer>{
    
}
