import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  trendItems = [
    { title: 'Scarpe', imageUrl: 'https://images.freeimages.com/variants/dFZffRTxCREWh82FF3LeQyCW/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&h=350' },
    { title: 'Scarpe Trekking', imageUrl: 'https://media.istockphoto.com/id/96946236/it/foto/scarponcini-da-hiking-per-il-trekking-in-montagna.jpg?s=1024x1024&w=is&k=20&c=gkTi1KoLbenaxze7cQfWc1rJbCHjmaE1WZgw79952Co=' },
    { title: 'Top Fitness', imageUrl: 'https://media.istockphoto.com/id/1272778062/it/foto/bella-donna-di-mezza-et%C3%A0-che-ride-dopo-lallenamento.jpg?s=1024x1024&w=is&k=20&c=OjCHOyTFlrsg6NxOXmPD7bzbCgKQoR9DgQbz0lcoa_Y=' },
    { title: 'Racchette Padel', imageUrl: 'https://media.istockphoto.com/id/1407091724/it/foto/primo-piano-del-giovane-giocatore-e-oggetti-da-paddle-o-tennis.jpg?s=1024x1024&w=is&k=20&c=7blUkVsGGDzPLmlhrb1gYKg6tuaWpGJs5WtO9ETGkd0=' },
    { title: 'Sup boarding', imageUrl: 'https://images.pexels.com/photos/19197444/pexels-photo-19197444/free-photo-of-attrezzatura-ricreazione-cenare-sport-acquatici.jpeg' },
    { title: 'Divise Rugby', imageUrl: 'https://media.istockphoto.com/id/1472571427/it/foto/allenamento-delle-giocatrici-di-rugby-femminile.jpg?s=1024x1024&w=is&k=20&c=ka3n3DZFE3KhKYpv3fUef5B_oeS_uxzUukyV6GViBa0=' },
  ];

  newItems = [
    { title: 'Scarpe', imageUrl: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { title: 'Mazze da Golf', imageUrl: 'https://images.pexels.com/photos/9207323/pexels-photo-9207323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Tavole Sup', imageUrl: 'https://media.istockphoto.com/id/913017692/it/foto/insegnare-al-mio-ragazzo-come-remare.jpg?s=1024x1024&w=is&k=20&c=OCeEYadCVYJnigxFExvLuFr3h561ClxIho1e7ZORiJQ=' },
    { title: 'Kettlebell', imageUrl: 'https://media.istockphoto.com/id/2053695371/it/foto/donna-concentrata-che-si-allena-con-kettlebell-in-un-ambiente-di-palestra.jpg?s=1024x1024&w=is&k=20&c=2ITrFRXkkEqZAwpvRxVcQgv1PtHn85oWV5vH4wq3vdU=' },
    { title: 'Nastri Ginnastica Ritmica', imageUrl: 'https://media.istockphoto.com/id/1227093134/it/foto/vista-ravvicinata-delle-gambe-da-ginnasta-femminile-in-palestra.jpg?s=1024x1024&w=is&k=20&c=cvEwODKieK4zB1Gsnaq4qtuyaQKLo32Hj-ifK4Ebl94=' },
    { title: 'Attrezzatura Trekking', imageUrl: 'https://media.istockphoto.com/id/1369171053/it/foto/gruppo-di-sportivi-cammina-in-montagna-al-tramonto-con-gli-zaini.jpg?s=1024x1024&w=is&k=20&c=olDQg6GpaRyIZI11MpmecYG7wokfIRc6Dy89sYJ-1G4=' }
  ];
  sportItems = [
    { title: 'Tennis', imageUrl: 'https://media.istockphoto.com/id/1351428897/it/foto/palla-da-tennis-sdraiata-sul-campo-concetto-di-stile-di-vita-sano.jpg?s=1024x1024&w=is&k=20&c=PIn2LE5iWBe48qswv3zL640LvSupQKSpZyiqMGZNN-k=' },
    { title: 'Fitness', imageUrl: 'https://images.pexels.com/photos/866027/pexels-photo-866027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Yoga', imageUrl: 'https://media.istockphoto.com/id/1354213603/it/foto/donna-anziana-che-fa-allenamento-a-casa.jpg?s=1024x1024&w=is&k=20&c=MvaGp3E7ugePuvX64YPL6o3DoIqbRnkDdp7cYEo93ww=' },
    { title: 'Surf', imageUrl: 'https://media.istockphoto.com/id/974184626/it/foto/bellissima-surfista-femminile-con-spazio-di-copia.jpg?s=1024x1024&w=is&k=20&c=BwNDj5BqJyXqIDXUk5wG7He-NfUjfTxKfQh5y2i_sws=' },
    { title: 'Spinning', imageUrl: 'https://media.istockphoto.com/id/1497018234/it/foto/persone-forti-e-sane-che-si-allenano.jpg?s=1024x1024&w=is&k=20&c=Pmd3diiy6UfbMeUz3gPYG0rKfgVkogBIdR-2eFBBTM4=' },
    { title: 'Freestyle Bike', imageUrl: 'https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
  ];

}
