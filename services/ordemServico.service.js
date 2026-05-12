import { React, useState } from "react";
import axios from "axios";
import { api } from "../api/api-config";

export async function TodasOrdens() {
  try {
    const { data, status } = await api.get("/OS");
    return data;
  } catch (error) {
    if(axios.isAxiosError(error))
    {
        alert('Erro ao trazer as ordens de serviço');
        return
    }

  }
}
