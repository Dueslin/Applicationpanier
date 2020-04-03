package fr.inti.apptest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.apptest.web.rest.TestUtil;

public class ProductalertsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productalerts.class);
        Productalerts productalerts1 = new Productalerts();
        productalerts1.setId("id1");
        Productalerts productalerts2 = new Productalerts();
        productalerts2.setId(productalerts1.getId());
        assertThat(productalerts1).isEqualTo(productalerts2);
        productalerts2.setId("id2");
        assertThat(productalerts1).isNotEqualTo(productalerts2);
        productalerts1.setId(null);
        assertThat(productalerts1).isNotEqualTo(productalerts2);
    }
}
