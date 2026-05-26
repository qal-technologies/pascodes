"use client";

import {
    DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger,
    VStack, Field, Input, NativeSelect, Textarea, Button, HStack, Text, Box,
    Portal,
    Flex
} from "@chakra-ui/react";
import {useState, useRef} from "react";
import {FaBold, FaHeading, FaLink, FaList, FaSave, FaTimes, FaImage, FaPen, FaEdit} from "react-icons/fa";

interface BlogData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
}

interface BlogModalProps {
    open: boolean;
    onClose: () => void;
    blog: BlogData;
    setBlog: (blog: BlogData) => void;
    onSave: () => void;
    isEditing: boolean;
}

export default function BlogModal ({open, onClose, blog, setBlog, onSave, isEditing}: BlogModalProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertText = (before: string, after: string = "") => {
        const textarea = textareaRef.current;
        if(!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        const newValue = text.substring(0, start) + before + selected + after + text.substring(end);

        setBlog({...blog, content: newValue});

        // Restore focus
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 10);
    };

    return (
        <Box position="fixed" top={0} left={0} right={0} bottom={0} bg="blackAlpha.500" zIndex={9999} display={open ? 'flex' : 'none'} pointerEvents={'none'}>
            <DialogRoot open={open} onOpenChange={(e) => !e.open && onClose()} size="full">
                <DialogContent bg="gray.900" border="1px solid" borderColor="whiteAlpha.200" >
                    <DialogHeader borderBottom="1px solid" borderColor="whiteAlpha.100" p={4} pt={35}>
                        <DialogTitle fontSize={{base: '2xl', md: '3xl'}} color="brandGreen.500" paddingInlineStart={10} fontFamily='PoppinsSemi'>
                            {isEditing ? "Update Blog Post" : "Create New Blog Post"}
                        </DialogTitle>
                    </DialogHeader>

                    <DialogBody py={8} overflowY="auto" p={10}>
                        <VStack gap={6} align="stretch">
                            <Flex gap={6} flexWrap={'wrap'}>
                                <Field.Root minWidth={'max-content'} maxWidth={'200px'}>
                                    <Field.Label fontWeight="bold">Post Title</Field.Label>
                                    <Input
                                        placeholder="The Future of AI..."
                                        value={blog?.title || ''}
                                        onChange={(e) => setBlog({...blog, title: e.target.value})}
                                        variant="flushed"
                                        borderBottom='1px solid '
                                        borderColor="brandGreen.500"
                                        whiteSpace={'nowrap'}
                                        lineClamp={1}
                                    />
                                </Field.Root>

                                <Field.Root width='max-content'>
                                    <Field.Label fontWeight="bold">Blog Slug</Field.Label>
                                    <Input
                                        placeholder="blog-slug"
                                        value={blog?.slug}
                                        onChange={(e) => setBlog({...blog, slug: e.target.value})}
                                        variant="flushed"
                                        borderBottom='1px solid '
                                        borderColor="brandGreen.500"
                                        whiteSpace={'nowrap'}
                                        lineClamp={1}
                                    />
                                </Field.Root>

                                <Field.Root minWidth={'max-content'} maxWidth={'200px'}>
                                    <Field.Label fontWeight="bold">Category</Field.Label>
                                    <NativeSelect.Root variant="subtle">
                                        <NativeSelect.Field
                                            value={blog?.category}
                                            onChange={(e) => setBlog({...blog, category: e.target.value})}
                                            colorPalette="brandGreen"
                                            borderBottom='1px solid '
                                            borderColor="brandGreen.500"
                                            whiteSpace={'nowrap'}
                                            lineClamp={1}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Tutorial">Tutorial</option>
                                            <option value="Tech News">Tech News</option>
                                            <option value="Case Study">Case Study</option>
                                            <option value="Personal">Personal</option>
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>
                                </Field.Root>
                            </Flex>

                            <Field.Root>
                                <Field.Label fontWeight="bold">Thumbnail URL</Field.Label>
                                <Input
                                    placeholder="https://..."
                                    value={blog?.image}
                                    onChange={(e) => setBlog({...blog, image: e.target.value})}
                                    variant="flushed"
                                    borderBottom='1px solid '
                                    borderColor="brandGreen.500"
                                    whiteSpace={'nowrap'}
                                    lineClamp={1}
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label fontWeight="bold">Brief Excerpt</Field.Label>
                                <Textarea
                                    placeholder="Short summary for the listing page..."
                                    value={blog?.excerpt}
                                    onChange={(e) => setBlog({...blog, excerpt: e.target.value})}
                                    variant="flushed"
                                    rows={3}
                                    borderBottom='1px solid '
                                    borderColor="brandGreen.500"
                                    whiteSpace={'nowrap'}
                                    lineClamp={1}


                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label fontWeight="bold" display="flex" justifyContent="space-between" width="full" flexWrap='wrap'>
                                    <Text width="full">Content (Markdown Supported)</Text>
                                    <HStack gap={2}>
                                        <Button size="xs" variant="outline" onClick={() => insertText("**", "**")} title="Bold"><FaBold /></Button>
                                        <Button size="xs" variant="outline" onClick={() => insertText("## ", "")} title="Heading"><FaHeading /></Button>
                                        <Button size="xs" variant="outline" onClick={() => insertText("- ", "")} title="List"><FaList /></Button>
                                        <Button size="xs" variant="outline" onClick={() => insertText("[", "](url)")} title="Link"><FaLink /></Button>
                                        <Button size="xs" variant="outline" onClick={() => insertText("![alt](", ")")} title="Image"><FaImage /></Button>
                                    </HStack>
                                </Field.Label>
                                <Textarea
                                    ref={textareaRef}
                                    placeholder="Write your masterpiece here..."
                                    value={blog?.content}
                                    onChange={(e) => setBlog({...blog, content: e.target.value})}
                                    variant="subtle"
                                    minH="400px"
                                    fontFamily="mono"
                                    fontSize="sm"
                                    border='1px solid '
                                    borderColor="brandGreen.500"
                                    borderRadius='12px'
                                    padding='10px'
                                />
                            </Field.Root>
                        </VStack>
                    </DialogBody>

                    <DialogFooter borderTop="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <DialogActionTrigger>
                            <Button variant="ghost" onClick={onClose} gap={'10px'}>
                                <FaTimes />
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button colorPalette="brandGreen" bgColor="brandGreen.500" onClick={onSave} gap='10px' px={'12px'}>
                            {isEditing ? <FaEdit /> : <FaSave />}
                            {isEditing ? "Edit" : "Publish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
}
