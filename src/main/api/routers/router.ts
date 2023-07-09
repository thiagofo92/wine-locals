import { Router } from "express";

export class RoutersServer {
  constructor(private readonly router: Router) {}


  build() {
    return this.router
  }
}