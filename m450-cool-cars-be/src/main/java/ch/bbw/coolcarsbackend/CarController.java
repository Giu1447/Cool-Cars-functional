package ch.bbw.coolcarsbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CarController implements ApplicationRunner {

    @Autowired
    private CarRepository carRepository;

    @GetMapping("")  // http://localhost:8080
    public String helloWorld() {
        return "Hello World from Backend";
    }

    @GetMapping("cars")
    public List<Car> getCars() {
        System.out.println(carRepository.findAll());
        return (List<Car>) carRepository.findAll();
    }

    @PostMapping("cars")
    public Car postCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    // Neue Funktion: Paginierte Autos abrufen
    @GetMapping("cars/paged")
    public Page<Car> getPagedCars(
            @RequestParam(defaultValue = "0") int page,  // Standard: Seite 0
            @RequestParam(defaultValue = "10") int size // Standard: 10 Elemente pro Seite
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return carRepository.findAll(pageable);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("App Runner...");
        carRepository
                .save(new Car(0, "Dodge", "Challenger", 500));
        carRepository
                .findAll()
                .forEach(System.out::println);
    }

    @GetMapping("cars/{id}")
    public Car getACar(@PathVariable int id) {
        return new Car(id, "Ford", "Mustang", 450);
    }
}
