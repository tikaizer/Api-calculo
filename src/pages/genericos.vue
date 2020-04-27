<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
        <q-banner class="bg-primary text-white">Valor da St dos Genéricos por MVA</q-banner>
        <q-form @submit="calcular" @reset="limpar" class="q-gutter-md">
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-select
                v-model="model"
                :options="options"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Escolha ao menos um valor na lista!']"
                label="Lista do Medicamento"
              />
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-pa-md">
              <q-field
                filled
                v-model="pf"
                lazy-rules
                :rules="[val => val !== null && val !== ''|| 'Informe Valor do preço de fábrica']"
                label="Preço de Fabrica"
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="desconto"
                lazy-rules
                :rules="[val => val !== null && val !== ''|| 'Informe Valor do preço de fábrica']"
                label="Percentual de desconto"
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="percentual"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-gutter-md botao">
              <q-btn color="primary" label="Calcular" type="submit" />
              <q-btn color="primary" label="Limpar" type="reset" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <q-page>
          <div class="q-pa-md">
            <div class="q-pa-md">
              <q-field
                filled
                v-model="pf_redutor"
                label="Base cálculo com redutor"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="pf_desconto"
                label="Valor PF com desconto"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="vlr_icms_18"
                label="Débito ICMS"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="vlr_icms_12"
                label="Crédito ICMS"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="mva"
                label="Base cálculo com MVA"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field filled v-model="valor_st" label="Valor da ST" style="width: 100%" readonly>
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
            <div class="q-pa-md">
              <q-field
                filled
                v-model="vlr_final"
                label="Valor do medicamento + ST"
                style="width: 100%"
                readonly
              >
                <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                  <money
                    :id="id"
                    class="q-field__input text-right"
                    :value="value"
                    @input="emitValue"
                    v-bind="money"
                    v-show="floatingLabel"
                  />
                </template>
              </q-field>
            </div>
          </div>
        </q-page>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Money } from "v-money";
export default {
  name: "Genericos",
  components: { Money },

  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      },
      percentual: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: " %",
        precision: 2,
        masked: false
      },
      model: null,
      accept: false,
      options: ["Positivo", "Negativo", "Neutro"],
      pf: "",
      pmc: "",
      desconto: "",
      pf_redutor: "",
      vlr_icms_18: "",
      vlr_icms_12: "",
      redutor: "",
      valor_st: "",
      vlr_final: "",
      pf_desconto: "",
      repasse: "",
      margem: "",
      markup: "",
      mva: ""
    };
  },

  methods: {
    calcular: function() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        message: "Calculado!"
      });
      let redutor = 0;
      this.repasse = 6.82;
      if (this.model === "Positivo") {
        redutor = 48.36;
      } else if (this.model === "Negativo") {
        redutor = 42.73;
      } else {
        redutor = 51.72;
      }
      //aplicando o redutor de  6.82%
      this.pf_redutor = this.pf - (this.pf / 100) * this.repasse;
      //aplicado o desconto no PF com redutor
      this.pf_desconto =
        this.pf_redutor - (this.pf_redutor / 100) * this.desconto;
      //aplicando Credito 12% ICMS
      this.vlr_icms_12 = this.pf_desconto * 0.12;
      //Calculo MVA para Generico
      this.mva = this.pf_desconto + (this.pf_desconto / 100) * redutor;
      //Calculo do Débito 18%
      this.vlr_icms_18 = this.mva * 0.18;
      //Valor final da ST
      this.valor_st = this.vlr_icms_18 - this.vlr_icms_12;
      //Valor final do produto
      this.vlr_final = this.valor_st + this.pf_desconto;

      this.markup = (this.vlr_final / this.pf_desconto) * 100;
      this.margem = (this.pf_desconto / this.vlr_final) * 100;

      return this.vlr_final;
    },
    limpar: function() {
      this.model = null;
      (this.pf_redutor = ""), (this.pf = "");
      this.pmc = "";
      this.desconto = "";
      this.pmc_redutor = "";
      this.vlr_icms_18 = "";
      this.vlr_icms_12 = "";
      this.redutor = "";
      this.valor_st = "";
      this.vlr_final = "";
      this.pf_desconto = "";
      this.repasse = "";
      (this.margem = ""), (this.markup = ""), (this.mva = "");
    },
    format2: function(valor) {
      let valorFormatado2 = valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      });
      return valorFormatado2;
    }
  }
};
</script>
<style scoped>
.botao {
  margin-top: 1px;
}
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>  