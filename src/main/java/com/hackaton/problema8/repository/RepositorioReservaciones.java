/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hackaton.problema8.repository;

import com.hackaton.problema8.controller.custom.CountClient;
import com.hackaton.problema8.repository.CRUD.InterfaceReservaciones;
import com.hackaton.problema8.model.Cliente;
import com.hackaton.problema8.model.Reservaciones;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author user
 */
@Repository
public class RepositorioReservaciones {
       @Autowired
    private InterfaceReservaciones crud4;
    public List<Reservaciones> getAll(){
        return (List<Reservaciones>) crud4.findAll();
    }
    public Optional<Reservaciones> getReservation(int id){
        return crud4.findById(id);
    }
    public Reservaciones save(Reservaciones reservation){
        return crud4.save(reservation);
    }
    public void delete(Reservaciones reservation){
        crud4.delete(reservation);
    }
    
    public List<Reservaciones> getReservationByStatus(String Status){
        return crud4.findAllByStatus(Status);
    }
    
    public List<Reservaciones> getReservationByPeriod(Date dateOne, Date dateTwo){
        return crud4.findAllByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
    }
    
    public List<CountClient> getTopClient(){
        List<CountClient> res=new ArrayList<>();
        List<Object[]> report=crud4.countReservationByClient();
        for (int i = 0; i < report.size(); i++) {
            /*
            Client cli=(Client) report.get(i)[0];
            Integer cantidad=(Integer) report.get(i)[1];
            CountClient cc=new CountClient(cantidad,cli);
            res.add(cc);
            */
            res.add(new CountClient((Long) report.get(i)[1],(Cliente)report.get(i)[0] ));

        }
        return res;
    }
}
