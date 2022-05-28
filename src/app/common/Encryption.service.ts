import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private enabled: boolean;
  encryptionJson = {
    "A": "qwe9",
    "B": "efc8",
    "C": "def7",
    "D": "gcv6",
    "E": "bhs5",
    "F": "sdf4",
    "G": "klj3",
    "H": "ads1",
    "I": "asf0",
    "J": "ghj0",
    "K": "ssx1",
    "L": "efc2",
    "M": "wwq3",
    "N": "efc4",
    "O": "asa5",
    "P": "elo6",
    "Q": "uls7",
    "R": "pql8",
    "S": "qks9",
    "T": "vgj9",
    "U": "aul8",
    "V": "qtd7",
    "W": "peH6",
    "X": "ulw5",
    "Y": "fmd3",
    "Z": "cnl1",
    "a": "CYe9",
    "b": "ePc8",
    "c": "def7",
    "d": "EhW6",
    "e": "bMR5",
    "f": "bvT4",
    "g": "PGr3",
    "h": "QLr1",
    "i": "UJd0",
    "j": "gTD0",
    "k": "LEx1",
    "l": "bFG2",
    "m": "wOO3",
    "n": "eIA4",
    "o": "aQL5",
    "p": "FlU6",
    "q": "bKs7",
    "r": "vPj4",
    "s": "Cis9",
    "t": "GKj9",
    "u": "aOL8",
    "v": "qTP7",
    "w": "GeH6",
    "x": "uoK5",
    "y": "fKq3",
    "z": "QQl1",
    "1": "ls7j",
    "2": "nP4K",
    "3": "bi9K",
    "4": "yK9O",
    "5": "mL8k",
    "6": "vP7J",
    "7": "eH6U",
    "8": "xK5Z",
    "9": "Zq3Y",
    "0": "Xz1i",
    "@": "ZWJ8",
    ".": "5diu"
  };

  constructor() {
    this.enabled = true;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string): string {
    if (!this.enabled)
      return plaintext;

    let buffer = [...plaintext];
    buffer.forEach(element => {
      let privateKey = this.encryptionJson[element];
      buffer = buffer.map((item) => { return item == element ? privateKey : item; });
    });

    return buffer.join('-').toString();
  }

  decrypt(cypher: string): string {
    if (!this.enabled)
      return cypher;

    let buffer = cypher.split('-');
    let encryptionJson = this.encryptionJson;
    buffer.forEach(element => {
      for (let publicKey in encryptionJson) {
        if (encryptionJson[publicKey] === element) {
          buffer = buffer.map((item) => { return item == element ? publicKey : item; });
        }
      }
    });

    return buffer.join('').toString();
  }
}
