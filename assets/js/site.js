(() => {
  const todayLocal = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  };
  const today = todayLocal();
  document.querySelectorAll('input[type="date"]').forEach((field) => {
    if (!field.min) field.min = today;
  });

  document.querySelectorAll('.menu-toggle').forEach((button) => {
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    if (!nav) return;
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      nav.hidden = open;
    });
  });

  document.querySelectorAll('form[data-demo-search]').forEach((form) => {
    const checkin = form.elements.checkin;
    const checkout = form.elements.checkout;
    if (!checkin || !checkout) return;
    const syncCheckout = () => {
      if (checkin.value) checkout.min = checkin.value;
      if (checkin.value && checkout.value && checkout.value < checkin.value) checkout.value = '';
    };
    checkin.addEventListener('change', syncCheckout);
    syncCheckout();
  });

  document.querySelectorAll('[data-demo-search]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const output = form.querySelector('.form-feedback');
      if (output) output.textContent = 'Busca demonstrativa: este projeto não consulta disponibilidade ou preços em tempo real.';
    });
  });

  const flightForm = document.querySelector('[data-flight-search]');
  if (flightForm) {
    const tripType = flightForm.elements.tripType;
    const returnDate = flightForm.elements.returnDate;
    const departureDate = flightForm.elements.departureDate;
    const syncReturnDate = () => {
      const oneWay = tripType.value === 'one-way';
      returnDate.disabled = oneWay;
      returnDate.required = !oneWay;
      if (oneWay) returnDate.value = '';
      if (departureDate.value) returnDate.min = departureDate.value;
    };
    tripType.addEventListener('change', syncReturnDate);
    departureDate.addEventListener('change', syncReturnDate);
    syncReturnDate();
  }

  const summary = document.getElementById('search-summary');
  if (summary) {
    const params = new URLSearchParams(window.location.search);
    const origin = params.get('origin');
    const destination = params.get('destination');
    const departure = params.get('departureDate');
    const returnDate = params.get('returnDate');
    if (origin && destination) {
      const route = document.createElement('strong');
      route.textContent = origin + ' → ' + destination;
      summary.replaceChildren(route);
      if (departure) summary.append(document.createTextNode(' · ida ' + departure));
      if (returnDate) summary.append(document.createTextNode(' · volta ' + returnDate));
    } else {
      summary.textContent = 'Você ainda não enviou uma busca. Os cartões abaixo são exemplos ilustrativos.';
    }
  }

  const results = document.getElementById('flight-results');
  if (results) {
    const cards = [...results.querySelectorAll('.flight-card')];
    let stopFilter = 'all';
    document.querySelectorAll('[data-filter-stops]').forEach((button) => {
      button.addEventListener('click', () => {
        stopFilter = button.dataset.filterStops;
        document.querySelectorAll('[data-filter-stops]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        cards.forEach((card) => {
          card.hidden = stopFilter !== 'all' && card.dataset.stops !== stopFilter;
        });
      });
    });
    const sort = document.querySelector('[data-sort-price]');
    if (sort) sort.addEventListener('click', () => {
      cards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price)).forEach((card) => results.append(card));
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-feedback');
    if (status) status.textContent = 'Formulário validado neste protótipo. Nenhuma mensagem foi enviada; é preciso conectar um serviço de formulários para receber contatos.';
    contactForm.reset();
  });
})();
