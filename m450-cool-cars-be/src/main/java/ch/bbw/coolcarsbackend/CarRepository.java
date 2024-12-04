package ch.bbw.coolcarsbackend;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    // Keine zusätzlichen Methoden erforderlich
}

