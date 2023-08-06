const agencies = require("./agencies");
const customers = require("./customers");
const taxesAuthority = {
  totalTaxesPaid: 0,
  sumOfAllTransactions: 0,
  numberOfTransactions: 0,
};

const CarMarket = {

  getAgencyByName: (name) => {
    const agencyObject = agencies.filter(
      (agency) => agency.agencyName === name
    );
    return agencyObject.length
      ? agencyObject[0]
      : "Agency not found, Please try another one";
  },

  getAgencyIdByName: (name) => {
    const agencyId = agencies.reduce(
      (acc, agency) =>
        agency.agencyName === name ? (acc = agency.agencyId) : acc,
      null
    );
    return agencyId !== null
      ? agencyId
      : "Agency not found, Please try another one";
  },

  getAllAgenciesName: () => {
    const agenciesNameArr = agencies.map((agency) => agency.agencyName);
    return agenciesNameArr;
  },

  getAllCarToBuy: () => {
    const allCarsToBuy = agencies.map((agency) => agency.cars);
    return allCarsToBuy;
  },

  getAllCarToBuyByAgencyId: (agencyId) => {
    const carsModelsArray = [];
    for (const agency of agencies) {
      if (agency.agencyId === agencyId) {
        const cars = agency.cars;
        for (const car of cars) {
          carsModelsArray.push(car.models);
        }
      }
    }
    return carsModelsArray;
  },

  getAllBrandsToBuyAgencyId: (agencyId) => {
    const carsBrandsArray = [];
    for (const agency of agencies) {
      if (agency.agencyId === agencyId) {
        const cars = agency.cars;
        for (const car of cars) {
          carsBrandsArray.push(car.brand);
        }
      }
    }
    return carsBrandsArray;
  },

  getCustomerByName: (name) => {
    const customer = customers.filter((customer) => customer.name === name);
    return customer[0];
  },

  getCustomerIdByName: (name) => {
    const customerId = customers.reduce(
      (acc, customer) => (customer.name === name ? (acc = customer.id) : acc),
      null
    );
    return customerId !== null
      ? customerId
      : "Customer not found, Please try another one";
  },

  getAllCustomersNames: () => {
    const customersNameArr = customers.map((customer) => customer.name);
    return customersNameArr;
  },

  getAllCustomerCars: (customerId) => {
    const customerCarsArray = [];
    for (const customer of customers) {
      if (customer.id === customerId) {
        const customerCars = customer.cars;
        for (const car of customerCars) {
          customerCarsArray.push(car);
        }
      }
    }
    return customerCarsArray;
  },

  getCustomerCash: (customerId) => {
    const customerCash = customers.filter(
      (customer) => customer.id === customerId
    );
    customerCash.reduce((acc, customer) => {
      acc += customer.cash;
      return acc;
    }, 0);
    return customerCash;
  },

  setPropertyBrandToAllCars: () => {
    for (const agency of agencies) {
      for (const car of agency.cars) {
        const brand = car.brand;
        for (const model of car.models) {
          model.brand = brand;
        }
      }
    }
  },

  setNewCarToAgency: (agencyId, carObject) => {
    for (const agency of agencies) {
      if (agency.agencyId === agencyId) {
        agency.cars.push(carObject);
      }
    }
  },

  deleteCarFromAgency: (agencyId, carNumber) => {
    for (const agency of agencies) {
      if (agency.agencyId === agencyId) {
        const cars = agency.cars;
        for (let i = 0; i < cars.length; i++) {
          if (cars[i].carNumber === carNumber) {
            cars.splice(i, 1);
            break;
          }
        }
      }
    }
  },

  decrementOrIncrementCashOfAgency: (agencyId, amount) => {
    const cashOfAgency = agencies.find(
      (agency) => agency.agencyId === agencyId
    );
    if (cashOfAgency) {
      return (cashOfAgency.cash += amount);
    }
  },

  decrementOrIncrementCreditOfAgency: (agencyId, amount) => {
    const agency = agencies.find((agency) => agency.agencyId === agencyId);
    if (agency) {
      return (agency.credit += amount);
    }
  },

  setAmountOfCarsToBuyToAllAgency: () => {
    for (const agency of agencies) {
      agency.amountOfCars = agency.cars.length;
    }
    return agencies;
  },

  setCarToCostumer: (customerId, carObj) => {
    const customer = customers.find((customer) => customer.id === customerId);
    if (customer) {
      customer.cars.push(carObj);
    }
    return customer.cars;
  },

  deleteCarOfCostumer: (customerId, carNumber) => {
    const customer = customers.find((customer) => customer.id === customerId);
    if (customer && customer.cars) {
      customer.cars = customer.cars.filter(
        (car) => car.carNumber !== carNumber
      );
      return customer;
    }
    return "Cant find customer id please try another one";
  },

  decrementOrIncrementCashOfCostumer: (customerId, amount) => {
    const cashOfCustomer = customers.find(
      (customer) => customer.id === customerId
    );
    if (cashOfCustomer) {
      return (cashOfCustomer.cash += amount);
    }
  },

  sortAndFilterByYearOfProduction: (
    carArray,
    fromYear,
    toYear,
    isAscendingOrder
  ) => {
    const arrayOfCars = carArray.filter(
      (car) => car.year >= fromYear && car.year <= toYear
    );
    arrayOfCars.sort((a, b) => {
      if (isAscendingOrder) {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });

    return arrayOfCars;
  },

  sortAndFilterByPrice: (carArray, fromPrice, toPrice, isAscendingOrder) => {
    const arrayOfCars = carArray.filter(
      (car) => car.price >= fromPrice && car.price <= toPrice
    );
    arrayOfCars.sort((a, b) => {
      if (isAscendingOrder) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return arrayOfCars;
  },

  searchCar: (carArray, fromYear, toYear, fromPrice, toPrice, brand) => {
    const arrayOfCars = carArray.filter((car) => {
      const isYearInRange = car.year >= fromYear && car.year <= toYear;
      const isPriceInRange = car.price >= fromPrice && car.price <= toPrice;
      const isBrandMatch =
        !brand || car.brand.toLowerCase() === brand.toLowerCase();
      return isYearInRange && isPriceInRange && isBrandMatch;
    });
    return arrayOfCars;
  },

   sellCar:  (agencyId, customerId, carModel) => {
    const agency = agencies.find((agency) => agency.agencyId === agencyId);
    if (!agency) {
      return 'The agency with the provided ID does not exist';
    }
    const customer = customers.find((customer) => customer.id === customerId);
    if (!customer) {
      return 'The customer with the provided ID does not exist';
    }
    const car = agency.cars.find((car) => car.models.find((model) => model.name === carModel.name)); 
    if (!car) {
      return 'The vehicle does not exist at the agency';
    }
    const totalPrice = car.price * 1.17;
    if (customer.cash < totalPrice) {
      return 'The customer does not have enough money';
    }
    agency.cash += car.price;
    customer.cash -= totalPrice;
    car.ownerId = customerId;
    agency.cars = agency.cars.filter((c) => c.models !== carModel);
    customer.cars.push(car);
    taxesAuthority.totalTaxesPaid += car.price * 0.17;
    taxesAuthority.numberOfTransactions++;
    taxesAuthority.sumOfAllTransactions += totalPrice;

    return car;

}
}
console.log(CarMarket.getAgencyByName("Best Deal"));
console.log(CarMarket.getAgencyIdByName("Best Deal"));
console.log(CarMarket.getAllAgenciesName());
console.log(CarMarket.getAllCarToBuy());
console.log(CarMarket.getAllCarToBuyByAgencyId("Plyq5M5AZ"));
console.log(CarMarket.getAllBrandsToBuyAgencyId("Plyq5M5AZ"));
console.log(CarMarket.getCustomerByName("Lilah Goulding"));
console.log(CarMarket.getCustomerIdByName("Lilah Goulding"));
console.log(CarMarket.getAllCustomersNames());
console.log(CarMarket.getAllCustomerCars("2RprZ1dbL"));
console.log(CarMarket.getCustomerCash("2RprZ1dbL"));
CarMarket.setPropertyBrandToAllCars();
CarMarket.setNewCarToAgency("Ply5M5AZ", { carTest: "newCarObject" });
CarMarket.deleteCarFromAgency("Plyq5M5AZ", "AZJZ4");
console.log(CarMarket.decrementOrIncrementCashOfAgency("Plyq5M5AZ", 500000));
console.log(CarMarket.decrementOrIncrementCreditOfAgency("Plyq5M5AZ", 32444));
console.log(CarMarket.setAmountOfCarsToBuyToAllAgency());
console.log(
  CarMarket.setCarToCostumer("2RprZ1dbL", { carTest: "newCarObject" })
);
console.log(
  CarMarket.deleteCarOfCostumer("2RprZ1dbL", { carTest: "newCarObject" })
);
console.log(CarMarket.decrementOrIncrementCashOfCostumer("2RprZ1dbL", -120908));
console.log(
  CarMarket.sortAndFilterByYearOfProduction(
    [
      { car: "car1", year: 2009 },
      { car: "car2", year: 2016 },
      { car: "car3", year: 2021 },
    ],
    2010,
    2023,
    false
  )
);
console.log(
  CarMarket.sortAndFilterByPrice(
    [
      { car: "car1", year: 2009, price: 32456 },
      { car: "car2", year: 2016, price: 423666 },
      { car: "car3", year: 2021, price: 569000 },
    ],
    100000,
    600000,
    false
  )
);
console.log(
  CarMarket.searchCar(
    [
      { brand: "Toyota", model: "Camry", year: 2018, price: 250000 },
      { brand: "Honda", model: "Civic", year: 2019, price: 220000 },
      { brand: "Ford", model: "Focus", year: 2020, price: 230000 },
      { brand: "BMW", model: "X5", year: 2017, price: 350000 },
    ],
    2019,
    2021,
    150000,
    432000
  )
);


console.log(CarMarket.sellCar("Plyq5M5AZ","2RprZ1dbL", {name: "3",year: 2015,price: 137000,carNumber: "AZJZ4",ownerId: "Plyq5M5AZ"}));