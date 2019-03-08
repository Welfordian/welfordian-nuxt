<template>
  <div
    :class="{'bg-blue-darkest': theme() === 'dark'}"
    class="container-fluid m-auto min-h-screen h-full pb-8 pt-24 flex justify-center px-4">
    <form @submit.prevent="submitForm" class="w-full max-w-md mt-2">
      <h1
        :class="{'text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}"
        class="block sm:flex items-center">Get in touch with me <p class="text-sm mt-2 mt-0 sm:ml-6">
        No recruiters, please.</p></h1>
      <div class="flex flex-wrap -mx-3 mt-8">
        <div class="w-full px-3">
          <label
            :class="{'text-red': errors.full_name, 'text-grey-darker': (!errors.full_name && theme() === 'light'), 'text-white': (!errors.full_name && theme() === 'dark')}"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            for="full-name">
            Full Name
          </label>
          <input
            :class="{'border-red': errors.full_name, 'border-grey': !errors.full_name}"
            class="appearance-none focus:shadow-lg block w-full text-grey-darker border border-grey rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker shadow-md"
            id="full-name"
            placeholder="Jane Doe" type="text" v-model="contact.name">
        </div>
        <div class="w-full mt-8 px-3">
          <label
            :class="{'text-red': errors.email_address, 'text-grey-darker': (!errors.email_address && theme() === 'light'), 'text-white': (!errors.email_address && theme() === 'dark')}"
            class="block uppercase focus:shadow-lg tracking-wide text-xs font-bold mb-2"
            for="email">
            Email Address
          </label>
          <input
            :class="{'border-red': errors.email_address, 'border-grey': !errors.email_address}"
            class="appearance-none focus:shadow-lg block w-full text-grey-darker border border-grey rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker shadow-md"
            id="email"
            placeholder="jane.doe@example.com" type="email" v-model="contact.email">
        </div>
        <div class="w-full mt-8 px-3">
          <label
            :class="{'text-white': theme() === 'dark', 'text-grey-darker': theme() === 'light'}"
            class="block uppercase tracking-wide text-xs font-bold mb-2">
            What's this about?
          </label>
          <app-button tag="p"
            class="enquiry-option mr-2 w-full block sm:w-auto sm:inline-block cursor-pointer my-2 bg-transparent font-semibold focus:outline-none focus:shadow-lg shadow-md hover:shadow-lg py-2 px-4 border rounded"
            @click.native.prevent="reason.state = !reason.state"
            @keyup.native.13.prevent="reason.state = !reason.state"
            @keyup.native.32.prevent="reason.state = !reason.state"
            tabindex="0"
            :key="reason.type"
            :active="reason.state"
            v-for="(reason) in contact.enquiry_types">
            {{ reason.text }}
          </app-button>
        </div>
        <div class="w-full mt-6 px-3">
          <label
            :class="{'text-red': errors.more_details, 'text-grey-darker': (!errors.more_details && theme() === 'light'), 'text-white': (!errors.more_details && theme() === 'dark')}"
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="more-details">
            Anything else to add?</label>
          <textarea
            :class="{'border-red': errors.more_details, 'border-grey': (!errors.more_details && theme() === 'light'), 'border-white': (!errors.more_details && theme() === 'dark')}"
            class="appearance-none block w-full h-32 text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none"
            id="more-details"
            placeholder="Some very important information"
            v-model="contact.message">Hello</textarea>
        </div>
        <div class="w-full px-3">
          <app-button class="mt-8">Get in touch</app-button>
          <p class="w-full mt-4 ml-0 sm:ml-8 inline-block sm:w-auto text-blue-darker font-bold rounded"
             v-if="formSubmitting">
            Sending...
          </p>
          <p class="w-full mt-4 ml-0 sm:ml-8 inline-block sm:w-auto text-blue-darker font-bold rounded"
             v-if="formSubmitted">
            Message sent!
          </p>
          <p class="w-full mt-4 ml-0 sm:ml-8 inline-block sm:w-auto text-red font-bold rounded"
             v-if="formFailed">
            Message failed to send, please try again later.
          </p>
          <p class="w-full mt-4 ml-0 sm:ml-8 inline-block sm:w-auto text-red font-bold rounded" v-if="hasErrors">
            Please correct the errors above
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
    import { eventBus } from "../eventBus";
    import { mapGetters } from 'vuex';
    import AppButton from "../components/AppButton";

    export default {
        components: {AppButton},
        data() {
            return {
                hasErrors: false,
                formSubmitting: false,
                formSubmitted: false,
                formFailed: false,

                errors: {
                    full_name: false,
                    email_address: false,
                    enquiry_types: false,
                    more_details: false,
                },

                contact: {
                    name: "",
                    email: "",
                    message: "",
                    enquiry_types: [
                        {type: "general_enquiry", state: true, text: "General Enquiry"},
                        {type: "web_development", state: false, text: "Web Development"},
                        {type: "freelancing", state: false, text: "Freelancing"},
                        {type: "full_time", state: false, text: "Full-Time"}
                    ]
                }
            }
        },

        methods: {
            ...mapGetters({
                theme: 'default/theme'
            }),

            submitForm() {
                if (this.formSubmitting || this.formSubmitted) {
                    return;
                }

                if (this.setErrors()) {
                    this.hasErrors = true;
                    this.formSubmitting = false;

                    return;
                } else {
                    this.hasErrors = false;
                    this.formSubmitting = true;
                }

                if (!this.hasErrors) {
                    let request = new Request('https://api.welford.me/contact', {
                        method: "POST",
                        body: JSON.stringify(this.contact)
                    });

                    fetch(request)
                        .then(response => response.json())
                        .then(json => {
                            this.formSubmitting = false;
                            this.formSubmitted = true;

                            this.clearForm();

                            setTimeout(() => {
                                this.formSubmitted = false;
                            }, 3500);
                        }).catch(() => {
                            this.formSubmitted = false;
                            this.formSubmitting = false;
                            this.formFailed = true;

                            setTimeout(() => {
                                this.formFailed = false;
                            }, 3500);
                    });
                }

            },

            setErrors() {
                if (this.contact.name.trim().length === 0) {
                    this.errors.full_name = true;
                } else {
                    this.errors.full_name = false;
                }

                if (this.contact.email.trim().length === 0) {
                    this.errors.email_address = true;
                } else {
                    this.errors.email_address = false;
                }

                if (this.contact.message.trim().length === 0) {
                    this.errors.more_details = true;
                } else {
                    this.errors.more_details = false;
                }

                return this.errors.name || this.errors.email || this.errors.enquiry_types || this.errors.more_details;
            },

            clearForm() {
                this.contact.message = "";
                this.contact.email = "";
                this.contact.name = "";
                this.contact.enquiry_types = [
                    {type: "general_enquiry", state: true, text: "General Enquiry"},
                    {type: "web_development", state: false, text: "Web Development"},
                    {type: "freelancing", state: false, text: "Freelancing"},
                    {type: "full_time", state: false, text: "Full-Time"}
                ];
            }
        },

        watch: {
            'contact.enquiry_types': {
                handler() {
                    let active = this.contact.enquiry_types.filter((enquiry_type) => { return enquiry_type.state === true; });

                    if (active.length === 0) {
                        this.contact.enquiry_types[0].state = true;
                    }
                },

                deep: true
            }
        },

        beforeRouteEnter(to, from, next) {
            eventBus.$emit('routeChange', to.fullPath);

            next();
        },

        head() {
            return {
                title: "Contact"
            }
        }
    }
</script>

<style scoped>
  input[type="text"], input[type="email"], textarea {
    -webkit-transition: border-color .3s, box-shadow .3s;
    -moz-transition: border-color .3s, box-shadow .3s;
    -ms-transition: border-color .3s, box-shadow .3s;
    -o-transition: border-color .3s, box-shadow .3s;
    transition: border-color .3s, box-shadow .3s;
  }

  p.enquiry-option, button {
    -webkit-transition: background-color .3s, box-shadow .3s;
    -moz-transition: background-color .3s, box-shadow .3s;
    -ms-transition: background-color .3s, box-shadow .3s;
    -o-transition: background-color .3s, box-shadow .3s;
    transition: background-color .3s, box-shadow .3s;
  }
</style>
