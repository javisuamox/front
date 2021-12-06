/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hackaton.problema8.repository.CRUD;

import com.hackaton.problema8.model.Reservaciones;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author user
 */
public interface InterfaceReservaciones extends CrudRepository<Reservaciones,Integer> {
    
    //select count(campo) from tablas where condicion
    //JPQL
    @Query("SELECT c.client, COUNT(c.client) FROM Reservaciones AS c group by c.client order by COUNT(c.client) desc")
    public List<Object[]> countReservationByClient();

    public List<Reservaciones> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date DateTwo);

    public List<Reservaciones> findAllByStatus(String Status);
}
