import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  //templates of categories and users only for testing
  users = new Array<User>

  categories = new Array<string>

  constructor() {
    this.users = [new User('Adam_Kowalski', false), new User('Monika16', false), new User('Łowca-okazji', false)]
    this.categories = ['Alkohole', 'Drób', 'Meble']
  }
  //end of testing code fragment

  adviceText = ''

  text: string = ''

  isHidden = true

  actionsArray = new Array<Actions>

  saveInput(event: any) {
    this.text = event.target.value
  }

  checkIfEmpty(): boolean {
    if (this.text == '') {
      return false
    } else {
      return true
    }
  }

  checkForUserExist(user: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (user == this.users.at(i)?.name) {
        return true
      }
    }
    return false
  }

  checkForUserToBan(user: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (user == this.users.at(i)?.name) {
        if (this.users.at(i)?.banned == false) {
          this.users.at(i)!.banned = true
          return true
        }
      }
    }
    return false
  }

  checkUserToUnban(user: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (user == this.users.at(i)?.name) {
        if (this.users.at(i)?.banned == true) {
          this.users.at(i)!.banned = false
          return true
        }
      }
    }
    return false
  }

  checkIfCategoryExist(category: string): boolean {
    for (let i = 0; i < this.categories.length; i++) {
      if (category == this.categories.at(i)) {
        return true
      }
    }
    return false
  }

  deleteCategoryArr(category: string) {
    for (let i = 0; i < this.categories.length; i++) {
      if (category == this.categories.at(i))
        this.categories.splice(i, 1);
    }
  }

  banUser() {
    if (this.checkIfEmpty()) {
      this.isHidden = true
      if (this.checkForUserToBan(this.text)) {
        this.actionsArray.push(new Actions('Zbanowano użytkownika: "' + this.text + '"'))
      } else {
        this.isHidden = false
        if (this.checkForUserExist(this.text)) {
          this.adviceText = 'Użytkownik już jest zbanowany'
        } else {
          this.adviceText = 'Podany użytkownik nie istnieje'
        }
      }
    } else {
      this.isHidden = false
      this.adviceText = 'Najpierw wpisz nick użytkownika'
    }
    this.text = ''
  }

  unbanUser() {
    if (this.checkIfEmpty()) {
      this.isHidden = true
      if (this.checkForUserExist(this.text)) {
        if (this.checkUserToUnban(this.text)) {
          this.actionsArray.push(new Actions('Oblokowano użytkownika: "' + this.text + '"'))
        } else {
          this.isHidden = false
          this.adviceText = 'Podany użytkownik nie jest zbanowany'
        }
      } else {
        this.isHidden = false
        this.adviceText = 'Podany użytkownik nie istnieje'
      }
    } else {
      this.isHidden = false
      this.adviceText = 'Najpierw wpisz nick użytkownika'
    }
    this.text = ''
  }

  addCategory() {
    if (this.checkIfEmpty()) {
      this.isHidden = true
      if (this.checkIfCategoryExist(this.text)) {
        this.isHidden = false
        this.adviceText = "Podana kategoria już istnieje"
      } else {
        this.categories.push(this.text)
        this.actionsArray.push(new Actions('Dodano kategorię: "' + this.text + '"'))
      }
    } else {
      this.isHidden = false
      this.adviceText = 'Najpierw wpisz nazwę kategorii'
    }
    this.text = ''
  }

  deleteCategory() {
    if (this.checkIfEmpty()) {
      this.isHidden = true
      if (this.checkIfCategoryExist(this.text)) {
        this.deleteCategoryArr(this.text)
        this.actionsArray.push(new Actions('Usunięto kategorię: "' + this.text + '"'))
      } else {
        this.isHidden = false
        this.adviceText = "Podana kategoria nie istnieje"
      }
    } else {
      this.isHidden = false
      this.adviceText = 'Najpierw wpisz nazwę kategorii'
    }
    this.text = ''
  }
}

class Actions {
  action: string
  date: Date
  formattedDate: string = ''

  constructor(actionName: string) {
    this.action = actionName
    this.date = new Date()
    this.formatDate()
  }

  formatDate() {
    this.formattedDate = this.date.toLocaleString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

//test class
class User {
  name: string
  banned: boolean

  constructor(name: string, banned: boolean) {
    this.name = name
    this.banned = banned
  }
}
