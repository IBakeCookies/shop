<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Newsletter from '@molecule/newsletter/newsletter.svelte';

    const { Story } = defineMeta({
        title: 'molecule/newsletter',
        component: Newsletter,
        args: {
            image: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Snowboarding.jpg/1200px-Snowboarding.jpg',
                alt: 'alt text',
            },
        },
    });
</script>

<Story name="Default" />
