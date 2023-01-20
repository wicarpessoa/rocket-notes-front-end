import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Textarea } from "../../components/Textarea";
import { ButtonText } from "../../components/ButtonText";

import { Container, Form } from "./styles";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const handleAddLink = (event) => {
    setLinks((links) => [...links, newLink]);
    setNewLink("");
  };

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  const handleAddTag = (event) => {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  };

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("O título é obrigátorio");
    }
  
    if (links.length === 0){
      return alert("Os links são obrigátorias");
    }
    if (tags.length === 0){
      return alert("As Tags são obrigátorias");
    }
    if (newLink) {
      return alert(
        "Você deixou um link no campo de adicionar, mas não clicou para salvar!"
      );
    }
    if (newTag) {
      return alert(
        "Você deixou uma tag no campo de adicionar, mas não clicou para salvar!"
      );
    }
    // console.log(links)
    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });
    alert("Nota cadastrada!");
    navigate(-1);
  }

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="voltar" onClick={handleBack}/>
          </header>
          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => {
              return (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              );
            })}
            <NoteItem
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="input-add-note"
              onClick={handleAddLink}
              placeholder="Novos links"
              isNew
            />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              <NoteItem
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="input-add-tag"
                onClick={handleAddTag}
                placeholder="Nova tag"
                isNew
              />
              {tags.map((tag, index) => {
                return (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                );
              })}
            </div>
          </Section>
          <Button title="salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
