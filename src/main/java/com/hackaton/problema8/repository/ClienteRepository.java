/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hackaton.problema8.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hackaton.problema8.repository.CRUD.ClienteRepositoryCrud;
import com.hackaton.problema8.model.Cliente;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Angie Moreno
 */
@Repository
public class ClienteRepository {
    @Autowired
    private ClienteRepositoryCrud crud1;

    public List<Cliente> getAll(){
        return (List<Cliente>) crud1.findAll();
    }
    public Optional<Cliente> getCliente(int id){
        return crud1.findById(id);
    }

    public Cliente save(Cliente cliente){
        return crud1.save(cliente);
    }
    public void delete(Cliente cliente){
        crud1.delete(cliente);
    }
}
