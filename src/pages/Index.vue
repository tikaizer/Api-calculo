<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
        <q-banner class="bg-primary text-white">Valor St pelo PMC do medicamento.</q-banner>
        <q-form @submit="calcular" @reset="limpar" class="q-gutter-md">
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-select
                v-model="model"
                :options="options"
                lazy-rules
                :rules="[val => val !== null && val !== '' || 'Escolha ao menos um valor na lista!']"
                label="Tipo Medicamento"
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
                v-model="pmc"
                lazy-rules
                :rules="[val => val !== null && val !== ''|| 'Informe Valor do preço máximo ao consumidor!']"
                label="Preço máximo ao consumidor"
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
                :rules="[val => val !== null && val !== ''|| 'Informe o desconto']"
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
                v-model="repasse"
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
              <q-field filled v-model="pf_desconto" label="Base cálculo com desconto" readonly>
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
              <q-field filled v-model="vlr_icms_12" label="Crédito ICMS" readonly>
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
              <q-field filled v-model="vlr_icms_18" label="Débito ICMS" readonly>
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
              <q-field filled v-model="valor_st" label="Valor ST" readonly>
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
              <q-field filled v-model="vlr_final" label="Valor medicamentos + ST" readonly>
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
              <q-field filled v-model="markup" label="Markup" readonly>
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
            <div class="q-pa-md">
              <q-field filled v-model="margem" label="Margem" readonly>
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
          </div>
        </q-page>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Money } from "v-money";
export default {
  name: "PageIndex",
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
      options: ["Referência", "Similar", "Genérico"],
      pf: "",
      pmc: "",
      desconto: "",
      pmc_redutor: "",
      vlr_icms_18: "",
      vlr_icms_12: "",
      redutor: "",
      valor_st: "",
      vlr_final: "",
      pf_desconto: "",
      repasse: "",
      margem: "",
      markup: ""
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
      if (this.model === "Referência") {
        redutor = 16;
      } else if (this.model === "Similar") {
        redutor = 35;
      } else {
        redutor = 30;
      }

      this.repasse = this.pf - (this.pf / 100) * 6.82;
      this.pf_desconto = this.repasse - ((this.repasse / 100) * this.desconto);
      this.vlr_icms_12 = (this.pf_desconto / 100) * 12;
      this.pmc_redutor = this.pmc - (this.pmc / 100) * redutor;
      this.vlr_icms_18 =
      this.pmc_redutor - (this.pmc_redutor - (this.pmc_redutor / 100) * 18);

      this.valor_st = this.vlr_icms_18 - this.vlr_icms_12;
      //fim valor da ST.
      //Validar se a ST é maior que PMC*5,60 o que for maior se mantem.
      let teste = this.pmc - (this.pmc - (this.pmc / 100) * 5.6);
      if (this.valor_st < teste) {
        this.valor_st = teste;
      }

      this.vlr_final = this.pf_desconto + this.valor_st;
   
      this.margem = ((this.pmc - this.vlr_final  ) / this.vlr_final) * 100;
      this.markup = ((this.pmc - this.vlr_final) / this.pmc) * 100;
      return this.vlr_final;
    },
    limpar: function() {
      this.model = null;
      this.pf = "";
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
      (this.margem = ""), this, (markup = "");
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