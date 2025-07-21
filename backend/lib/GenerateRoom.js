import { Server } from "socket.io";
import http from "http";
import express from "express";

export const GenerateRoomCode = Math.random().toString(36).substring(2, 15);