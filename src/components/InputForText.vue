<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: "",
	},
	type: {
		type: String,
		default: "text",
	},
	required: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: String,
		default: "",
	},
});
const emit = defineEmits(["update:modelValue"]);

function handleInput(event: Event): void {
	const target = event.target as HTMLInputElement;
	if (target) {
		emit("update:modelValue", target.value);
	}
}
</script>

<template>
	<div class="w-full">
		<label
			:for="label.toLocaleLowerCase()"
			class="block text-sm font-medium leading-6 text-primary"
		>
			{{ label }}
		</label>
		<div class="mt-2">
			<input
				:id="label.toLocaleLowerCase()"
				:name="label.toLocaleLowerCase()"
				:type="type"
				:required="required"
				class="block w-full bg-transparent focus:shadow-inner-neumorphic shadow-light-inner-neumorphic rounded-md border-0 py-3 text-primary ring-0 focus:ring-0 focus:ring-inset focus:ring-ring sm:text-sm sm:leading-6"
				:value="modelValue"
				@input="handleInput"
			/>
		</div>
	</div>
</template>
